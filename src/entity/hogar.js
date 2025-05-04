import { EntitySchema } from "typeorm";

export const HogarSchema = new EntitySchema({
    name: "Hogar",
    tableName: "hogares",
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



