import { EntitySchema } from "typeorm";

export const Solicitudschema = new EntitySchema({
    name: "Solicitud",
    tableName: "Solicitudes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        tipo: {
            primary: true,
            type: "enum",
            enum: [
                "Certificado de Residencia",
                "Acta de reunion",
            ],
            default: "Certificado de Residencia"
        },
        motivo: {
            type: "enum",
            enum: [
                "Para fines personales",
                "Para fines laborales",
                "Para fines escolares",
                "Para fines judiciales",
                "para fines gubernamentales",
                "para consultar",
            ],
            default: "para consultar"
        },
        estado: {
            type: "enum",
            enum: ["pendiente", "aprobado", "rechazado"],
            default: "pendiente",
        },
        justificacionDeReachazo: {
            type: "varchar",
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