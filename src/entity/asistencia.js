import { EntitySchema } from "typeorm";

export const AsistenciaSchema = new EntitySchema({
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
        reunionId: {
            type: "int",
            nullable: false,
            unique: true,
        },
        usuarioId: {
            type: "int",
            nullable: false,
            unique: true,
        },
    },
    relations: {
        reunion: {
            target: "Reunion",
            type: "many-to-one",
            joinColumn: { name: "reunionId" },
            inverseSide: "asistencias",
        },
    usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: { name: "usuarioId" },
            inverseSide: "asistencias",
        },    
    },
});