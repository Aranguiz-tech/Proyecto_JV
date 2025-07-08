import { AppDataSource } from "../config/configDb.js";
import User from "../entity/user.entity.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getUserService(query) {
  try {
    const { rut, id, email } = query;

    const userRepo = AppDataSource.getRepository(User); 

    const usuario = await userRepo.findOne({
      where: [{ rut }, { id }, { email }].filter(Boolean)
    });

    if (!usuario) return [null, "Usuario no encontrado"];

    const { password, ...data } = usuario;
    return [data, null];
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUsersService() {
  try {
    const userRepo = AppDataSource.getRepository(User);

    const usuarios = await userRepo.find({
      relations: ["hogar"] 
    });

    const usuariosLimpios = usuarios.map(({ password, ...rest }) => rest);

    return [usuariosLimpios, null];
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateUserService(rut, nuevosDatos) {
  try {
    const userRepo = AppDataSource.getRepository(User);

    const usuario = await userRepo.findOne({ where: { rut } });
    if (!usuario) return [null, "Usuario no encontrado"];

    usuario.nombre = nuevosDatos.nombre || usuario.nombre;
    usuario.apellido = nuevosDatos.apellido || usuario.apellido;
    usuario.email = nuevosDatos.email || usuario.email;
    usuario.telefono = nuevosDatos.telefono || usuario.telefono;
    usuario.rol = nuevosDatos.rol || usuario.rol;

    if (nuevosDatos.password && nuevosDatos.password !== "") {
      usuario.password = await encryptPassword(nuevosDatos.password);
    }

    await userRepo.save(usuario);

    const { password, ...usuarioSinPassword } = usuario;

    return [usuarioSinPassword, null];
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteUserService(rut) {
  try {
    const userRepo = AppDataSource.getRepository(User);

    const usuario = await userRepo.findOne({ where: { rut } });
    if (!usuario) return [null, "Usuario no encontrado"];

    await userRepo.remove(usuario);

    const { password, ...usuarioSinPassword } = usuario;
    return [usuarioSinPassword, null];
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return [null, "Error interno del servidor"];
  }
}