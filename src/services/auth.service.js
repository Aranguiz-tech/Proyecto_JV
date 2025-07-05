"use strict";
import User from "../entity/user.entity.js";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";
import Hogar from "../entity/hogar.entity.js"
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
      nombreCompleto: userFound.nombreCompleto,
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
    const userRepo = AppDataSource.getRepository(User);
    const hogarRepo = AppDataSource.getRepository(Hogar);

    const { rut, nombre, apellido, email, telefono, password, rol, hogarId } = user;

    const usuarioExistente = await userRepo.findOne({ where: { rut } });
    if (usuarioExistente) {
      return [null, { dataInfo: "rut", message: "El usuario ya existe" }];
    }

    const emailExistente = await userRepo.findOne({ where: { email } });
    if (emailExistente) {
      return [null, { dataInfo: "email", message: "El email ya está en uso" }];
    }

    const hogar = await hogarRepo.findOne({ where: { id: hogarId } });
    if (!hogar) {
      return [null, { dataInfo: "hogarId", message: "El hogar no existe" }];
    }

    if (rol === "jefe de hogar") {
      const jefeExistente = await userRepo.findOne({
        where: {
          rol: "jefe de hogar",
          hogar: { id: hogarId }
        }
      });

      if (jefeExistente) {
        return [null, { dataInfo: "hogarId", message: "El hogar ya tiene un jefe de hogar" }];
      }
    }

    const nuevo = userRepo.create({
      rut,
      nombre,
      apellido,
      email,
      telefono,
      password: await encryptPassword(password),
      rol,
      hogar: { id: hogarId }
    });

    await userRepo.save(nuevo);

    const { password: _, ...sinPassword } = nuevo;
    return [sinPassword, null];

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return [null, "Error interno del servidor"];
  }
}