import { AppDataSource } from "../config/configDB.js";
import { createReunionService, getAllReunionesService, cancelarReunionService } from "../services/reunion.service.js";

export const createReunion = async (req, res) => {
  try {
    const resultado = await createReunionService(req.body);

    if (resultado.error) {
      return res.status(400).json({ message: resultado.error });
    }

    return res.status(201).json({
      message: "Reunión creada correctamente",
      reunion: resultado,
    });

  } catch (error) {
    console.error("Error al crear nueva reunión:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const getAllReuniones = async (res) => {
  try {
    const reuniones = await getAllReunionesService();
    return res.status(200).json(reuniones);
  } catch (error) {
    console.error("Error al obtener reuniones:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};


export const deleteReunion = async (req, res) => {
  const { id } = req.params;

  try {
    const reunionRepo = AppDataSource.getRepository("Reunion");
    const reunion = await reunionRepo.findOne({ where: { id } });

    if (!reunion) {
      return res.status(404).json({ message: "Reunión no encontrada" });
    }

    await reunionRepo.remove(reunion);
    return res.status(200).json({ message: "Reunión eliminada correctamente" });

  } catch (error) {
    console.error("Error al eliminar la reunión:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const cancelarReunion = async (req, res) => {
  const { id } = req.params;
  const { motivo } = req.body;

  try {
    const resultado = await cancelarReunionService(id, motivo);

    if (resultado.error) {
      return res.status(400).json({ message: resultado.error });
    }

    return res.status(200).json({
      message: "Reunión cancelada correctamente",
      reunion: resultado,
    });
  } catch (error) {
    console.error("Error al cancelar reunión:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
