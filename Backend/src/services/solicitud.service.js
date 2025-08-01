"use strict";
import { AppDataSource } from "../config/configDb.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import { transporter } from "./correo.service.js";

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

export async function getSolicitudesPorRutService(rut) {
  try {
    const solicitudRepo = AppDataSource.getRepository("Solicitud");

    const solicitudes = await solicitudRepo
      .createQueryBuilder("solicitud")
      .leftJoinAndSelect("solicitud.usuario", "usuario")
      .where("usuario.rut = :rut", { rut })
      .orderBy("solicitud.id", "DESC")
      .getMany();

    return [solicitudes, null];
  } catch (error) {
    return [null, error];
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
    const { estado, justificacionDeRechazo } = data;
    const SolRepo = AppDataSource.getRepository("Solicitud");

    const solicitud = await SolRepo.findOne({
      where: { id },
      relations: ["usuario", "usuario.hogar"],
    });

    if (!solicitud) return [null, "Solicitud no encontrada"];

    solicitud.estado = estado;
    

    if (estado !== "aprobado") {
      if (!justificacionDeRechazo || justificacionDeRechazo === null) {
        solicitud.justificacionDeRechazo = "No se ha proporcionado una justificación de rechazo";
      }

      try {
        const { nombre, apellido, email } = solicitud.usuario;
        await transporter.sendMail({
          from: '"Junta de Vecinos" <gabriels.guzmanc@gmail.com>', 
          to: email,  
          subject: "Certificado de Residencia Rechazado",
          text: `Estimado(a) ${nombre} ${apellido},\n\nSu solicitud de certificado de residencia ha sido rechazada. Encontrará la justificacion de rechazo de la solicitud en la pagina oficial de la junta de vecinos.\n\nSaludos cordiales,\nJunta de Vecinos Parque Ecuador`,
        });
        console.log("Correo enviado correctamente");
      } catch (error) {
        console.error("Error enviando correo:", error);
      }


      solicitud.justificacionDeRechazo = justificacionDeRechazo;
    } else if (solicitud.tipo === "Certificado de Residencia") {
      const carpetaDocumentos = path.join(process.cwd(), "documentos");
      if (!fs.existsSync(carpetaDocumentos)) {
        fs.mkdirSync(carpetaDocumentos, { recursive: true });
      }

      const fileName = `certificado_${solicitud.id}_${crypto.randomUUID().slice(0, 8)}.pdf`;
      const filePath = path.join("documentos", fileName);
      const absolutePath = path.join(process.cwd(), filePath);

      const doc = new PDFDocument({
        margins: { top: 50, bottom: 50, left: 72, right: 72 },
      });

      doc.pipe(fs.createWriteStream(absolutePath));

      doc
        .fontSize(10)
        .text(new Date().toLocaleDateString("es-CL"), { align: "right" });

      const { nombre, apellido, email, rut, hogar } = solicitud.usuario;
      const direccion = hogar?.direccion || "DIRECCIÓN NO DISPONIBLE";

      doc
        .moveDown(2)
        .fontSize(14)
        .text("La junta de vecinos “Parque Ecuador”", { align: "left" })
        .moveDown()
        .fontSize(12)
        .text("Certifica que:")
        .moveDown()
        .text(`Señor(a): ${nombre} ${apellido}, Rut: ${rut}`)
        .moveDown()
        .text(`Mantiene domicilio vigente en la dirección: ${direccion}, comuna de Concepción.`)
        .moveDown()
        .text(
          `Se extiende el presente certificado a solicitud del interesado(a) para ser presentado ${solicitud.motivo}, con el fin de acreditar su domicilio.`
        )
        .moveDown()
        .text("La validez del certificado es de tres meses a contar de la fecha de su emisión.")
        .moveDown(4)
        .text("Atentamente,", { align: "left" });

      const selloPath = path.join(process.cwd(), "assets", "sello.png");
      const firmaX = 72;
      const firmaY = doc.y + 30;

      if (fs.existsSync(selloPath)) {
        doc.image(selloPath, firmaX, firmaY - 40, { width: 100 });
      }

      doc
        .moveDown(4)
        .text("_______________________________", firmaX, firmaY, { align: "left" })
        .text("Presidente(a) de la Junta de Vecinos", firmaX, firmaY + 15, { align: "left" });

      doc.end();

      solicitud.documentoNombre = fileName;
      solicitud.documentoRuta = filePath;

      try {
        await transporter.sendMail({
          from: '"Junta de Vecinos" <gabriels.guzmanc@gmail.com>', 
          to: email,  
          subject: "Certificado de Residencia Aprobado",
          text: `Estimado(a) ${nombre} ${apellido},\n\nSu solicitud de certificado de residencia ha sido aprobada. Encontrará su solicitud en la pagina oficial de la junta de vecinos.\n\nSaludos cordiales,\nJunta de Vecinos Parque Ecuador`,
        });
        console.log("Correo enviado correctamente");
      } catch (error) {
        console.error("Error enviando correo:", error);
      }


    }
    solicitud.justificacionDeRechazo = justificacionDeRechazo;

    const actualizada = await SolRepo.save(solicitud);
    return [actualizada, null];
  } catch {
    return [null, "Error del servidor"];
  }
}





