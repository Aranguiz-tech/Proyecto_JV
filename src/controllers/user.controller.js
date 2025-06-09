import { AppDataSource } from "../config/configDB.js";

export const createUsuario = async (req, res) => {
    const { rut, nombre, apellido, email, telefono, password, rol, id_hogar } = req.body;

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
   
        const hogarExistente = await hogarRepo.findOne({ where: { id: id_hogar } });
        if (!hogarExistente) {
            return res.status(404).json({ message: "El hogar indicado no existe" });
        }

       if (rol === "jefe de hogar") {
        const existeJefe = await userRepo.findOne({
          where: { rol, hogar: { id: id_hogar } }
         });
         console.log(rol, id_hogar);

         if (existeJefe)
         return res.status(400).json({ message: "Ya existe un jefe de hogar en esta dirección." });
        }

        
        const usuarioNuevo = userRepo.create({
            rut,
            nombre,
            apellido,
            email,
            telefono,
            password,
            rol,
            hogar: { id: id_hogar }
        });

        await userRepo.save(usuarioNuevo);
        return res.status(201).json(usuarioNuevo);

    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ mensaje: "Error del servidor" });
    }
};

export const createHogar = async (req, res) => {
    const { direccion } = req.body;
    try {
        const hogarRepo = AppDataSource.getRepository("Hogar");

        const hogarExistente = await hogarRepo.findOne({ where: { direccion } });
        if (hogarExistente) {
            return res.status(400).json({ message: "La dirección ya está registrada" });
        }

        const nuevoHogar = hogarRepo.create({ direccion });
        await hogarRepo.save(nuevoHogar);

        return res.status(201).json(nuevoHogar);
    } catch (error) {
        console.error("Error al crear hogar:", error);
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
