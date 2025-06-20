import { AppDataSource } from "../config/configDB.js";

export const createReunion = async (req, res) => {
  try {
    const { asunto, fechaInicio } = req.body;

    if (!asunto || !fechaInicio) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const reunionRepo = AppDataSource.getRepository("Reunion");
    const existeReunion = await reunionRepo.findOne({ where: { fechaInicio } }); 

    if (existeReunion) {
      return res.status(400).json({ message: "Ya existe una reunión programada para esta fecha" });
    }

    const hoy = new Date();
    const fecha = new Date(fechaInicio);
  
    if (fecha < hoy ) {
      return res.status(400).json({ message: "La fecha de inicio no puede ser anterior a hoy" });
    }

    const nuevaReunion = reunionRepo.create({
      asunto,
      fechaInicio,
      estado: "programada" 
    });

    await reunionRepo.save(nuevaReunion);

    return res.status(201).json({
      message: "Reunión creada correctamente",
      reunion: {
        id: nuevaReunion.id,
        asunto: nuevaReunion.asunto,
        fechaInicio: nuevaReunion.fechaInicio,
        estado: nuevaReunion.estado
      }
    });
  } catch (error) {
    console.error("Error al crear la reunión:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
