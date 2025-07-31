import { EntitySchema } from "typeorm";

export const ActaSchema = new EntitySchema({
  name: "Acta",
  tableName: "actas",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    titulo: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    contenido: {
      type: "text",
      nullable: false,
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
    reunionId: {
      type: "int",
      nullable: false,
      unique: true,
    },
  },
  relations: {
    reunion: {
      target: "Reunion",
      type: "one-to-one",
      joinColumn: { name: "reunionId" },
      inverseSide: "acta",
    },
  },
});
export default ActaSchema;

