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
        asistencias: {
            target: "Asistencia",
            type: "one-to-many",
            inverseSide: "reunion",
            cascade: true, 
        },
        hogar: {
            target: "Hogar",
            type: "many-to-one",
            joinColumn: { name: "hogarId" },
            inverseSide: "reuniones",
            onDelete: "CASCADE", 
        },
    },
});
