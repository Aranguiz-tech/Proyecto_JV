"use strict";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";
import Usuario from "../entity/user.entity.js";
import Hogar from "../entity/hogar.entity.js";
import Reunion from "../entity/reunion.entity.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository("Usuario");
    const hogarRepository = AppDataSource.getRepository("Hogar");

    const userCount = await userRepository.count();
    if (userCount > 0) return;
  
    let hogar = await hogarRepository.findOne({
      where: { direccion: "Calle Principal 123, Villa Ejemplo" },
    });

   if (!hogar) {
    hogar = hogarRepository.create({
    direccion: "Calle Principal 123, Villa Ejemplo",
    });
    hogar = await hogarRepository.save(hogar); 
    console.log("* => Hogar creado");
    }

   
    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombre: "Dilan",
          apellido: "Aránguiz",
          rut: "21.151.897-9",
          email: "dilanAranguiz@gmail.cl",
          telefono: "987654321",
          password: await encryptPassword("dilan1234"),
          rol: "administrador",
          hogar,
        })
      ),
      userRepository.save(
        userRepository.create({
          nombre: "Gabriel",
          apellido: "Guzmán",
          rut: "21.357.093-5",
          email: "gabriel@gmail.cl",
          telefono: "993586086",
          password: await encryptPassword("gabriel1234"),
          rol: "administrador",
          hogar,
        })
      ),
      userRepository.save(
        userRepository.create({
          nombre: "Usuario",
          apellido: "Prueba",
          rut: "20.738.450-K",
          email: "usuario@gmail.cl",
          telefono: "918283456",
          password: await encryptPassword("usuario1234"),
          rol: "vecino",
          hogar,
        })
      ),
      userRepository.save(
        userRepository.create({
          nombre: "Jefe",
          apellido: "Hogar",
          rut: "21.454.015-0",
          email: "jefe@gmail.cl",
          telefono: "912784526",
          password: await encryptPassword("jefe1234"),
          rol: "jefe de hogar",
          hogar,
        })
      ),
    ]);

    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios y hogar:", error);
  }
}

export { createUsers };
