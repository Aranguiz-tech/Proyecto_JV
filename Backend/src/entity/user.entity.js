"use strict";
import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombreCompleto: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    rut: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: true,
    },
    /* direccion: {
      type: "varchar",
      length: 100,
      nullable: false,
    },*/
    email: {
      type: "varchar",
      length: 255,
      nullable: false,
      unique: true,
    },
    telefono: {
      type: "varchar",
      length: 15,
      nullable: true,
    },
    rol: {
      type: "enum",
      enum: ["administrador", "jefe de hogar", "vecino"],
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  relations: {
        hogar: {
            target: "Hogar",
            type: "many-to-one",
            joinColumn: { name: "id_hogar" },
            nullable: true, //cambiar más adelante
            inverseSide: "usuarios", 
        },
        asistencias: {
            target: "Asistencia",
            type: "one-to-many",
            inverseSide: "usuario", 
        },
    },
  indices: [
    {
      name: "IDX_USER",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_USER_RUT",
      columns: ["rut"],
      unique: true,
    },
    {
      name: "IDX_USER_EMAIL",
      columns: ["email"],
      unique: true,
    },
  ],
});

export default UserSchema;