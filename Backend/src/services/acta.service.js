import { AppDataSource } from "../config/configDb.js";
import { validarActa } from "../validations/acta.validation.js";

export async function createActaService(datos) {
  const error = validarActa(datos);
  if (error) return [error];

  const { titulo, contenido, reunionId } = datos;

  const actaRepo = AppDataSource.getRepository("Acta");
  const reunionRepo = AppDataSource.getRepository("Reunion");

  const reunion = await reunionRepo.findOne({ where: { id: reunionId } });
  if (!reunion) return ["No existe la reunión"];

  const existeActa = await actaRepo.findOne({ where: { reunion: { id: reunionId } } });
  if (existeActa) return ["Ya hay acta para esta reunión"];

  const nueva = actaRepo.create({
    titulo,
    contenido,
    reunion: { id: reunionId }
  });

  await actaRepo.save(nueva);

  reunion.estado = "realizada";
  await reunionRepo.save(reunion);

  return [nueva];
}

export async function getActaService(id) {
  const actaRepo = AppDataSource.getRepository("Acta");
  const acta = await actaRepo.findOne({
    where: { id },
    relations: ["reunion"]
  });

  if (!acta) {
    return ["No se encontró el acta"];
  }

  return [acta];
}
