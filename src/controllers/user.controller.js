import { AppDataSource } from "../config/configDB.js";

export const createUsuario = async (req, res) => {
    const { rut, nombre, apellido, email, telefono, password, rol, direccion } = req.body; 


    try { 
        const userRepo = AppDataSource.getRepository("Usuario");
        const hogarRepo = AppDataSource.getRepository("Hogar");
       
        const existeUsuario = await userRepo.findOne({ where: { rut } });
        if (existeUsuario) {
            return res.status(400).json({ message: "El RUT ya está registrado" });
        }
        const existeEmail = await userRepo.findOne({ where: { email } });
        if (existeEmail) { 
            return res.status(400).json({ message: "El email ya está registrado" });
        }
 
        const hogarExistente = await hogarRepo.findOne({ where: { direccion } }); 

        let hogarFinal; 

        if (hogarExistente) { 
            hogarFinal = hogarExistente; 
        } else {
            const nuevoHogar = hogarRepo.create({ direccion });
            hogarFinal = await hogarRepo.save(nuevoHogar);
            
        }

        if (rol === "jefe de hogar") {
          const jefeExistente = await userRepo.findOne({
       where: { id_hogar: hogarFinal.id, rol : "jefe de hogar" }});
       if (jefeExistente) {
        return res.status(400).json({ message: "Ya existe un jefe de hogar en esta dirección." });
      }
          }

        const usuarioNuevo = userRepo.create({
            rut,
            nombre,
            apellido,
            email,
            telefono,
            password,
            rol,
            id_hogar: hogarFinal.id
        });
        

        await userRepo.save(usuarioNuevo);
        return res.status(201).json(usuarioNuevo);

    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ mensaje: "Error del servidor" });
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
