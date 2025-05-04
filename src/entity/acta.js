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
});