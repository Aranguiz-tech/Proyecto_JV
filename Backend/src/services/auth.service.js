"use strict";
import User from "../entity/user.entity.js";
import Hogar from "../entity/hogar.entity.js";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";

export async function loginService(user) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = user;

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message
    });

    const userFound = await userRepository.findOne({
      where: { email }
    });
    

    if (!userFound) {
      return [null, createErrorMessage("email", "El correo electrónico es incorrecto")];
    }

    const isMatch = await comparePassword(password, userFound.password);

    if (!isMatch) {
      return [null, createErrorMessage("password", "La contraseña es incorrecta")];
    }

    const payload = {
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      email: userFound.email,
      rut: userFound.rut,
      rol: userFound.rol,
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return [accessToken, null];
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return [null, "Error interno del servidor"];
  }
}


export async function registerService(user) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const hogarRepository = AppDataSource.getRepository(Hogar);

    const nombre = user.nombre;
    const apellido = user.apellido;
    const rut = user.rut;
    const email = user.email;
    const telefono = user.telefono;
    const password = user.password;
    const id_hogar = user.id_hogar;
    const rol = user.rol;

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message,
    });
 
    const existingEmailUser = await userRepository.findOne({
      where: { email },
    });
    if (existingEmailUser) {
      return [null, createErrorMessage("email", "Correo electrónico en uso")];
    }
  
    const existingRutUser = await userRepository.findOne({
      where: { rut },
    });
    if (existingRutUser) {
      return [null, createErrorMessage("rut", "Rut ya asociado a una cuenta")];
    }
 
    const hogarExistente = await hogarRepository.findOne({
      where: { id: id_hogar },
    });
    if (!hogarExistente) {
      return [null, createErrorMessage("id_hogar", "El hogar asociado no existe")];
    }
    
    if (rol === "jefe de hogar") {
      const jefeExistente = await userRepository.findOne({
        where: {
          rol: "jefe de hogar",
          hogar: { id: id_hogar }
        },
        relations: ["hogar"]
      });

      if (jefeExistente) {
        return [null, createErrorMessage("rol", "Este hogar ya tiene un jefe de hogar asignado")];
      }
    }
    
    const newUser = userRepository.create({
      nombre,
      apellido,
      email,
      telefono,
      rut,
      password: await encryptPassword(password),
      rol,
      hogar: { id: id_hogar },
    });

    await userRepository.save(newUser);

    const { password: _, ...dataUser } = newUser;
    return [dataUser, null];

  } catch (error) {
    console.error("Error al registrar un usuario", error);
    return [null, "Error interno del servidor"];
  }
}