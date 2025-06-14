import { AppDataSource } from "../config/configDB.js";
import { crearUsuarioService } from "../services/user.service.js";

export const createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await crearUsuarioService(req.body);
    
    if (nuevoUsuario.error) {
      return res.status(400).json({ message: nuevoUsuario.error });
    }

    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};


export const deleteUsuario = async (req, res) => {
    const { rut } = req.params;

    try {
        const userRepo = AppDataSource.getRepository("Usuario");
        const usuario = await userRepo.findOne({ where: { rut } });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await userRepo.remove(usuario);
        return res.status(200).json({ message: "Usuario eliminado correctamente" });

    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUserPorRut = async (req, res) => {
    const { rut } = req.params;

      try {
        const userRepo = AppDataSource.getRepository("Usuario");
        const usuario = await userRepo.findOne({ where: { rut } });

        if (!usuario) {
            return res.status(404).json({ message: "Vecino no encontrado" });
        }
        return res.status(200).json(usuario); 

    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
