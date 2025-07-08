import { EntitySchema } from "typeorm";

const Asistencia = new EntitySchema({
  name: "Asistencia",
  tableName: "asistencias",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    asistencia: {
      type: "enum",
      enum: ["presente", "ausente", "justificado"],
      default: "ausente",
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
    reunion: {
      target: "Reunion",
      type: "many-to-one",
      joinColumn: { name: "reunionId" },
      inverseSide: "asistencias",
      nullable: false,
      onDelete: "CASCADE",
    },
    hogar: {
      target: "Hogar",
      type: "many-to-one",
      joinColumn: { name: "hogarId" },
      inverseSide: "asistencias",
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

export default Asistencia;
