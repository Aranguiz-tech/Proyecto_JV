"use strict";
import { AppDataSource } from "../config/configDb.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import PDFDocument from "pdfkit";

export async function createSolicitudService(data) {
  try {
    const { tipo, motivo, usuario, archivoNombre, archivoRuta } = data;
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const nuevaSolicitud = SolRepo.create({
      tipo,
      motivo,
      archivoNombre,
      archivoRuta,
      usuario,
    });

    await SolRepo.save(nuevaSolicitud);

    return [nuevaSolicitud, null];
  } catch (error) {
    return [null, "Error del servidor"];
  }
}

export async function getSolicitudesPorUsuarioService(usuarioId) {
  try {
    const solicitudRepo = AppDataSource.getRepository("Solicitud");

    const solicitudes = await solicitudRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: ["usuario"],
    });

    return [solicitudes, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function getSolicitudPorIdService(id) {
  try {
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({
      where: { id },
      relations: ["usuario"],
    });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    return [solicitud, null];
  } catch (error) {
    return [null, "Error del servidor"];
  }
}

export async function getSolicitudesService() {
  try {
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitudes = await SolRepo.find({ relations: ["usuario"] });

    if (!solicitudes || solicitudes.length === 0) {
      return [null, "No se encontraron solicitudes"];
    }

    return [solicitudes, null];
  } catch (error) {
    return [null, "Error del servidor"];
  }
}

export async function deleteSolicitudService(id) {
  try {
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({ where: { id } });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    await SolRepo.remove(solicitud);

    return [solicitud, null];
  } catch (error) {
    return [null, "Error del servidor"];
  }
}

export async function updateSolicitudService(id, data) {
  try {
    const { tipo, motivo, archivoNombre, archivoRuta } = data;
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({ where: { id }, relations: ["usuario"] });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    solicitud.tipo = tipo;
    solicitud.motivo = motivo;
    solicitud.archivoNombre = archivoNombre;
    solicitud.archivoRuta = archivoRuta;

    const actualizada = await SolRepo.save(solicitud);

    return [actualizada, null];
  } catch (error) {
    return [null, "Error del servidor"];
  }
}

export async function updateEstadoSolicitudService(id, data) {
  try {
    const { estado, justificacionDeReachazo } = data;
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({
      where: { id },
      relations: ["usuario"],
    });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    solicitud.estado = estado;

    if (estado !== "aprobado") {
      solicitud.justificacionDeReachazo =
        justificacionDeReachazo || "No se ha proporcionado una justificación de rechazo";
    } else if (solicitud.tipo === "Certificado de Residencia") {
      const carpetaDocumentos = path.join(process.cwd(), "documentos");
      if (!fs.existsSync(carpetaDocumentos)) fs.mkdirSync(carpetaDocumentos);

      const fileName = `certificado_${solicitud.id}_${crypto.randomUUID().slice(0, 8)}.pdf`;
      const filePath = path.join("documentos", fileName);
      const absolutePath = path.join(process.cwd(), filePath);

      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(absolutePath));

      doc
        .fontSize(10)
        .text(new Date().toLocaleDateString("es-CL"), 470, 40, { align: "right" });

      const { nombre, apellidos, rut, direccion } = solicitud.usuario;

      doc
        .moveDown(3)
        .fontSize(14)
        .text("La junta de vecinos “Parque ecuador”,", { align: "left" })
        .moveDown()
        .text("Certifica que:", { align: "left" })
        .moveDown()
        .text(`Señor(a): ${nombre} ${apellidos}, Rut: ${rut}`)
        .moveDown()
        .text(`Mantiene domicilio vigente en dirección: ${direccion}, comuna de Concepción`)
        .moveDown()
        .text(
          `Se extiende el presente certificado a solicitud del interesado(a) para ser presentado ${solicitud.motivo}, para efecto de acreditar el domicilio.`
        )
        .moveDown()
        .text("La validez del certificado es de tres meses a contar de la fecha de su emisión.");

      const selloPath = path.join(process.cwd(), "assets", "sello.png");
      if (fs.existsSync(selloPath)) {
        doc.image(selloPath, doc.page.width / 2 - 50, doc.y + 50, {
          width: 100,
          align: "center",
        });
      }

      doc.end();

      solicitud.documentoNombre = fileName;
      solicitud.documentoRuta = filePath;
    }

    const actualizada = await SolRepo.save(solicitud);
    return [actualizada, null];
  } catch (error) {
    return [null, "Error del servidor"];
  }
}
