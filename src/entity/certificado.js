import { EntitySchema } from "typeorm";

export const CertificadoSchema = new EntitySchema({
    name: "Certificado",
    tableName: "certificados",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        motivo: {
            type: "enum",
            enum: ["Para fines personales", "Para fines laborales", "Para fines escolares", "Para fines judiciales", "para fines gubernamentales"],
            default: "asistencia",
        },
        estado: {
            type: "enum",
            enum: ["pendiente", "aprobado", "rechazado"],
            default: "pendiente",
        },
        justificacionDeReachazo: {
            type: "text",
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
});