"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Dilan Aranguiz",
          rut: "21.151.897-9",
          email: "dilan@gmail.cl",
          telefono: "987654321",
          password: await encryptPassword("dilan1234"),
          rol: "administrador",
        })
      ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Gabriel Guzmán",
            rut: "21.357.093-5",
            email: "gabriel@gmail.cl",
            telefono: "993586086",
            password: await encryptPassword("gabriel1234"),
            rol: "administrador",
          }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Usuario",
          rut: "20.738.450-K",
          email: "usuario@gmail.cl",
          telefono: "918283456",
          password: await encryptPassword("usuario1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Jefe de Hogar",
          rut: "21.454.015-0",
          email: "jefe@gmail.cl",
          telefono: "912784526",
          password: await encryptPassword("jefe1234"),
          rol: "jefe de hogar",
        }),
      ),
      
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

export { createUsers };