import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "Usuario",
  tableName: "usuarios",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    rol: {
      type: "enum",
      enum: ["administrador", "jefe de hogar", "vecino"],
      nullable: false,
    },
    rut: {
      type: "varchar",
      length: 12,
      unique: true,
      nullable: false,
    },
    nombre: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    apellido: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    // direccion: {
    //   type: "varchar",
    //   length: 100,
    //   nullable: false,
    // },
    telefono: {
      type: "varchar",
      length: 15,
      nullable: true,
    },
    email: {
      type: "varchar",
      length: 100,
      unique: true,
      nullable: true,
    },
    password: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    fechaCreacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    fechaActualizacion: {
      type: "timestamp",
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
      nullable: false,
      inverseSide: "usuarios",
      onDelete: "CASCADE" 
    },
    /*asistencias: {
      target: "Asistencia",
      type: "one-to-many",
      inverseSide: "usuario",
    },
  */ 
 solicitudes: {
      type: "one-to-many",
      target: "Solicitud",
      inverseSide: "usuario",
    },
  },
});

export default User;
