import { EntitySchema } from "typeorm";

export const ReunionSchema = new EntitySchema({
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
            type: "timestamp",
            nullable: false,
        },
        fechaFin: {
            type: "timestamp",
            nullable: false,
        },
        estado: {
            type: "enum",
            enum: ["programada", "realizada", "cancelada"],
            default: "programada",
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
        creador: {
            type: "many-to-one",
            target: "Usuario", 
            joinColumn: true,
            nullable: false,
        },
    },
});
