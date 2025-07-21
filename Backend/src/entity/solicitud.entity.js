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
        archivoNombre: {
            type: "varchar",
            nullable: true,
        },
        archivoRuta: {
            type: "varchar",
            nullable: true,
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
    relations: {
        usuario: {
            type: "many-to-one",
            target: "Usuario",
            joinColumn: { name: "usuarioId" },
            nullable: false,
            inverseSide: "solicitudes",
            onDelete: "CASCADE",
        },

    }
});