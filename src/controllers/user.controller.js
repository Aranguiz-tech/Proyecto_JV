"use strict";
import {
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";

import {
  userBodyValidation,
  userQueryValidation,
} from "../validations/user.validation.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getUser(req, res) {
  try {
    const { rut, id, email } = req.query;

    const { error } = userQueryValidation.validate({ rut, id, email });
    if (error) return handleErrorClient(res, 400, "Error de validación", error.message);

    const [user, errorUser] = await getUserService({ rut, id, email });

    if (errorUser) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Usuario encontrado", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUsers(req, res) {
  try {
    const [users, errorUsers] = await getUsersService();

    if (errorUsers) return handleErrorClient(res, 404, errorUsers);

    users.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Usuarios encontrados", users);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateUser(req, res) {
  try {
    const { rut } = req.params;
    const { body } = req;

    const { error: bodyError } = userBodyValidation.validate(body);
    if (bodyError)
      return handleErrorClient(res, 400, "Error en los datos", bodyError.message);

    const [updatedUser, updateError] = await updateUserService(rut, body);

    if (updateError)
      return handleErrorClient(res, 400, "Error modificando al usuario", updateError);

    handleSuccess(res, 200, "Usuario actualizado correctamente", updatedUser);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { rut, id, email } = req.query;

    const { error } = userQueryValidation.validate({ rut, id, email });
    if (error)
      return handleErrorClient(res, 400, "Error en la consulta", error.message);

    const [deletedUser, deleteError] = await deleteUserService({ rut, id, email });

    if (deleteError)
      return handleErrorClient(res, 404, "Error eliminando al usuario", deleteError);

    handleSuccess(res, 200, "Usuario eliminado correctamente", deletedUser);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
