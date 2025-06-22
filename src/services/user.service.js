import { AppDataSource } from "../config/configDB.js";

export const crearUsuarioService = async (datos) => {
    const userRepo = AppDataSource.getRepository("Usuario");
    const hogarRepo = AppDataSource.getRepository("Hogar");

    const { rut, nombre, apellido, email, telefono, password, rol, hogarId } = datos;

    const usuarioExistente = await userRepo.findOne({ where: { rut } });
    if (usuarioExistente) {
        return { error: "El usuario ya existe" };
    }

    const emailExistente = await userRepo.findOne({ where: { email } });
    if (emailExistente) {
        return { error: "El email ya está en uso" };
    }

    const hogar = await hogarRepo.findOne({ where: { id: hogarId } });
    if (!hogar) {
        return { error: "El hogar no existe" };
    }
    if (rol === "jefe de hogar") {
    const jefeExistente = await userRepo.findOne({
    where: {
      rol: "jefe de hogar",
      hogar: { id: hogarId }
    }
    });

    if (jefeExistente) {
    return { error: "El hogar ya tiene un jefe de hogar" };
    }
   }
    const nuevoUsuario = userRepo.create({
        rut,
        nombre,
        apellido,
        email,
        telefono,
        password,
        rol,
        hogar: { id: hogarId }
    });

    await userRepo.save(nuevoUsuario);

    return {
        id: nuevoUsuario.id,
        rut: nuevoUsuario.rut,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        telefono: nuevoUsuario.telefono,
        rol: nuevoUsuario.rol,
        hogarId: nuevoUsuario.hogar.id
    }
};

export const actualizarUsuarioService = async (rut, nuevosDatos) => {
    const userRepo = AppDataSource.getRepository("Usuario");

    const usuario = await userRepo.findOne({ where: { rut } });
    if (!usuario) {
        return { error: "Usuario no encontrado" };
    }
    
    usuario.nombre = nuevosDatos.nombre || usuario.nombre;
    usuario.apellido = nuevosDatos.apellido || usuario.apellido;
    usuario.email = nuevosDatos.email || usuario.email;
    usuario.telefono = nuevosDatos.telefono || usuario.telefono;
    usuario.rol = nuevosDatos.rol || usuario.rol;

    await userRepo.save(usuario);

    return {
        id: usuario.id,
        rut: usuario.rut,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol
    };
};
