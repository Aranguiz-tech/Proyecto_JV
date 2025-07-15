import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
    return {
        ...user,
        nombre: startCase(user.nombre),
        apellido: startCase(user.apellido),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}
export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

export function formatPostUpdate(user) {
    return {
        nombre: startCase(user.nombre),
        apellido: startCase(user.apellido),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}

// ---- Funciones para solicitudes ----

export function formatSolicitudData(solicitud) {
    return {
        ...solicitud,
        tipo: startCase(solicitud.tipo || ''),
        motivo: startCase(solicitud.motivo || ''),
        estado: startCase(solicitud.estado || ''),
        justificacionDeRechazo: solicitud.justificacionDeRechazo || '',
        fechaCreacion: solicitud.fechaCreacion
            ? formatTempo(solicitud.fechaCreacion, "DD-MM-YYYY")
            : '',
        fechaActualizacion: solicitud.fechaActualizacion
            ? formatTempo(solicitud.fechaActualizacion, "DD-MM-YYYY")
            : '',
    };
}

export function formatPostUpdateSolicitud(solicitud) {
    return {
        tipo: startCase(solicitud.tipo || ''),
        motivo: startCase(solicitud.motivo || ''),
        estado: startCase(solicitud.estado || ''),
        justificacionDeRechazo: solicitud.justificacionDeRechazo || '',
        fechaCreacion: solicitud.fechaCreacion
            ? formatTempo(solicitud.fechaCreacion, "DD-MM-YYYY")
            : '',
        fechaActualizacion: solicitud.fechaActualizacion
            ? formatTempo(solicitud.fechaActualizacion, "DD-MM-YYYY")
            : '',
    };
}

export function formatCrearReunion(reunion) {
    return { 
        asunto: reunion.asunto || '',
        fecha: reunion.fechaInicio ? formatTempo(reunion.fechaInicio, "DD-MM-YYYY") : '',
    };
}

export function formatCancelarReunion(reunion) {
    return {
        motivo: reunion.motivo || '',
    };
}
export function formatGetReunion(reunion) {
    return {
        ...reunion,
        asunto: reunion.asunto || '',
        fecha: reunion.fecha ? formatTempo(reunion.fecha, "DD-MM-YYYY") : '',
    };
}

