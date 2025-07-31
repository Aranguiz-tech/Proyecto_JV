"use strict";
import { createActaService, getActaService } from "../services/acta.service.js";

export async function createActa(req, res) {
  const datos = req.body;

  const [resultado] = await createActaService(datos);

  if (typeof resultado === "string") {
    res.status(400).json({ status: "Error", message: resultado });
    return;
  }

  res.status(201).json({ status: "Success", data: resultado });
}

export async function getActa(req, res) {
  const id = parseInt(req.params.id);

  const [resultado] = await getActaService(id);

  if (typeof resultado === "string") {
    res.status(404).json({ status: "Error", message: resultado });
    return;
  }

  res.status(200).json({ status: "Success", data: resultado });
}
