import { EntitySchema } from "typeorm";

const Reunion = new EntitySchema({
  name: "Reunion",
  tableName: "reuniones",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    asunto: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    fechaInicio: {
      type: "date",
      nullable: false,
    },
    lugar: {
      type: "varchar",
      enum: ["Parque Ecuador", "Museo parque Ecuador"],
      nullable: true,
    },
    estado: {
      type: "enum",
      enum: ["programada", "realizada", "cancelada"],
      default: "programada",
    },
    motivoCancelacion: {
      type: "varchar",
      length: 255,
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
    asistencias: {
      target: "Asistencia",
      type: "one-to-many",
      inverseSide: "reunion",
      cascade: true,
    },
  },
});

export default Reunion;
