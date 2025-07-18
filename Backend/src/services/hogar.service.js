import { AppDataSource } from "../config/configDb.js";

export async function createHogarService(direccion) {
  try {
    if (!direccion) {
      return [null, "La dirección es obligatoria"];
    }

    const hogarRepo = AppDataSource.getRepository("Hogar");

    const existente = await hogarRepo.findOne({ where: { direccion } });
    if (existente) {
      return [null, "La dirección ya está registrada"];
    }

    const nuevo = hogarRepo.create({ direccion });
    await hogarRepo.save(nuevo);

    return [nuevo, null];
  } catch (error) {
    console.error("Error al crear hogar:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function getAllHogaresService() {
  try {
    const hogarRepo = AppDataSource.getRepository("Hogar");
    const hogares = await hogarRepo.find({ order: { direccion: "ASC" } });

    return [hogares, null];
  } catch (error) {
    console.error("Error al obtener hogares:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function getHogarService(id) {
  try {
    const hogarRepo = AppDataSource.getRepository("Hogar");

    const hogar = await hogarRepo.findOne({ where: { id } });
    if (!hogar) return [null, "Hogar no encontrado"];

    return [hogar, null];
  } catch (error) {
    console.error("Error al buscar hogar:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function updateHogarService(id, nuevaDireccion) {
  try {
    const hogarRepo = AppDataSource.getRepository("Hogar");

    const hogar = await hogarRepo.findOne({ where: { id } });
    if (!hogar) return [null, "Hogar no encontrado"];

    if (hogar.direccion === nuevaDireccion) {
      return [null, "La nueva dirección es igual a la actual"];
    }

    const yaExiste = await hogarRepo.findOne({ where: { direccion: nuevaDireccion } });
    if (yaExiste) return [null, "Ya existe un hogar con esa dirección"];

    hogar.direccion = nuevaDireccion;
    await hogarRepo.save(hogar);

    return [hogar, null];
  } catch (error) {
    console.error("Error al actualizar hogar:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteHogarService(id) {
  try {
    const hogarRepo = AppDataSource.getRepository("Hogar");

    const hogar = await hogarRepo.findOne({ where: { id } });
    if (!hogar) return [null, "Hogar no encontrado"];

    await hogarRepo.remove(hogar);
    return [hogar, null];
  } catch (error) {
    console.error("Error al eliminar hogar:", error);
    return [null, "Error interno del servidor"];
  }
}
