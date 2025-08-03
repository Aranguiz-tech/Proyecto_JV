import { AppDataSource } from "../config/configDb.js";
import { transporter } from "./correo.service.js";

export async function createReunionService(datos) {
  try {
    const { asunto, fechaInicio, lugar } = datos;

    if (!asunto || !fechaInicio || !lugar) {
      return ["Faltan campos obligatorios"];
    }


    const reunionRepo = AppDataSource.getRepository("Reunion");

    const existeReunion = await reunionRepo.findOne({ where: { fechaInicio } });
    if (existeReunion) {
      return ["Ya existe una reunión programada para esta fecha"];
    }

    const hoy = new Date();
    const fecha = new Date(fechaInicio);

    if (fecha < hoy) {
      return [ "La fecha de inicio no puede ser anterior a hoy"];
    }

    const nuevaReunion = reunionRepo.create({
      asunto,
      fechaInicio,
      lugar,
      estado: "programada",
    });

    await reunionRepo.save(nuevaReunion);

    const usuarioRepo = AppDataSource.getRepository("Usuario");

    const usuarios = await usuarioRepo.find();

    for (const usuario of usuarios) {
      try {
        await transporter.sendMail({
          from: '"Junta de Vecinos" <gabriels.guzmanc@gmail.com>', 
          to: usuario.email,  
          subject: `Reunión Programada Fecha: ${fechaInicio}`,
          text: `Estimados vecinos,\n\nSe ha programado una reunion para la fecha ${fechaInicio} con motivo ${asunto} \n\n Esperamos su asistencia\n\nSaludos cordiales,\nJunta de Vecinos Parque Ecuador`,
        });
        console.log("Correo enviado correctamente");
      } catch (error) {
        console.error("Error enviando correo:", error);
      }
    }
    

    return [nuevaReunion];

  } catch (error) {
    console.error("Error al crear reunión:", error);
    return ["Error interno del servidor"];
  }
}

export async function getAllReunionesService() {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reuniones = await reunionRepo.find({
      relations: { acta: true }, 
      order: { fechaInicio: "ASC" }
    });

    return [reuniones];
  } catch (error) {
    console.error("Error al obtener reuniones:", error);
    return [ "Error interno del servidor"];
  }
}


export async function cancelarReunionService(id, motivo) {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reunion = await reunionRepo.findOne({ where: { id } });
    if (!reunion) {
      return [ "Reunión no encontrada"];
    }

    if (reunion.estado === "cancelada") {
      return [ "La reunión ya está cancelada"];
    }

    if (reunion.estado === "realizada") {
      return [ "No puedes cancelar una reunión que ya fue realizada"];
    }

    if (!motivo || motivo == "") {
      motivo = "Sin motivo especificado";
    }

    reunion.estado = "cancelada";
    reunion.motivoCancelacion = motivo

    await reunionRepo.save(reunion);


    const usuarioRepo = AppDataSource.getRepository("Usuario");

    const usuarios = await usuarioRepo.find();

    for (const usuario of usuarios) {
      try {
        await transporter.sendMail({
          from: '"Junta de Vecinos" <gabriels.guzmanc@gmail.com>', 
          to: usuario.email,  
          subject: `Reunión Cancelada Fecha: ${reunion.fechaInicio}`,
          text: `Estimados vecinos,\n\nSe ha cancelado la reunion para la fecha ${reunion.fechaInicio} con motivo ${reunion.asunto} \n\n Por razones de: ${motivo.motivo} \n\nSaludos cordiales,\nJunta de Vecinos Parque Ecuador`,
        });
        console.log("Correo enviado correctamente");
      } catch (error) {
        console.error("Error enviando correo:", error);
      }
    }


    return [reunion];

  } catch (error) {
    console.error("Error al cancelar reunión:", error);
    return [ "Error interno del servidor"];
  }
}


export async function deleteReunionService(id) {
  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");

    const reunion = await reunionRepo.findOne({ where: { id } });
    if (!reunion) {
      return [ "Reunión no encontrada"];
    }

    if (reunion.estado === "realizada") {
      return ["No puedes eliminar una reunión que ya fue realizada"];
    }

    await reunionRepo.remove(reunion);
    return [reunion, null];
  } catch (error) {
    console.error("Error al eliminar reunión:", error);
    return [ "Error interno del servidor"];
  }
}

export async function finalizarReunionService(id) {
  const repo = AppDataSource.getRepository("Reunion");
  const reunion = await repo.findOne({ where: { id } });

  if (!reunion)
    return ["Reunión no encontrada"];

  if (reunion.estado !== "programada")
    return ["Solo puedes finalizar reuniones programadas"];

  reunion.estado = "realizada";
  reunion.fechaActualizacion = new Date();

  await repo.save(reunion);

  return [reunion];
}
