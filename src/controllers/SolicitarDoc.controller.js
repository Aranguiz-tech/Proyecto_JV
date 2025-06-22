import { AppDataSource } from "../config/configDB.js";

export const createSolicitud = async (req, res) => {
    const {tipo, motivo} = req.body;

    try { 
        const SolRepo = AppDataSource.getRepository("Documento");

        const SolicitudNuevo = SolRepo.create({
            tipo,
            motivo,
        });

        await SolRepo.save(SolicitudNuevo);
       
        return res.status(201).json(SolicitudNuevo);

    } catch (error) {
        console.error("Error al crear solicitud de documento:", error);
        return res.status(500).json({ mensaje: "Error del servidor" });
    }
};


export const getSolicitudPorid = async (req, res) => {
    const { id } = req.params;

    try {
        const SolRepo = AppDataSource.getRepository("Documento");

        const solicitud = await SolRepo.findOne({ where: { id } });

        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }

    } catch (error) {
        console.error("Error al obtener la solicitud de documento:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export async function getSolicitudes(req, res) {
    const SolRepo = AppDataSource.getRepository("Documento");
    const Solicitudes = await SolRepo.find();
    if (!Solicitudes) {
        return res.status(404).json({
            message: "No se encontraron Solicitudes ",
            data: null
        });
    }
    return res.status(302).json({
        message: "Se encontraron solicitudes ",
        data: Solicitudes
    })
}

export async function deleteSolicitud(req,res) {
    try {
        const SolRepo = AppDataSource.getRepository("Documento");
        const id = req.params.id;
        const Soldeleted = await SolRepo.findOne({ where: [{ id: id }] });
        if (!Soldeleted) {
            return res.status(404).json({ message: "Solicitud no encontrada", data: null });
        }

        await SolRepo.delete({ id });
        return res.status(200).json({ message: "Solicitud eliminada", data: Soldeleted });
        
    } catch (error) {
        console.error("Error al eliminar la solicitud de documento:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function updateSolicitud(req,res) {
    try {
        const {tipo, motivo} = req.body;

        const SolRepo = AppDataSource.getRepository("Documento");
        const id = req.params.id;
        const Solicitud = await SolRepo.findOne({ where: [{ id: id }] });

        if (!Solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada", data: null });
        }

        Solicitud.tipo = tipo;
        Solicitud.motivo = motivo;

        const SolicitudActualizada = await SolRepo.save(Solicitud)

        return res.status(200).json({ message: "Solicitud Actualizada", data: SolicitudActualizada });
        
    } catch (error) {
        console.error("Error al actualizar la solicitud de documento:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function updateEstadoSolicitud(req,res) {
    try {
        const {estado} = req.body;

        const SolRepo = AppDataSource.getRepository("Documento");
        const id = req.params.id;
        const Solicitud = await SolRepo.findOne({ where: [{ id: id }] });

        if (!Solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada", data: null });
        }

        if(estado !== "aprobado"){
            let {justificacionDeReachazo} =req.body;
            if(!justificacionDeReachazo){
                justificacionDeReachazo = "No se ha proporcionado una justificacion de rechazo";
                Solicitud.justificacionDeReachazo = justificacionDeReachazo;
            }else{
                Solicitud.justificacionDeReachazo = justificacionDeReachazo;
            }
        }

        Solicitud.estado = estado;

        const SolicitudActualizada = await SolRepo.save(Solicitud)

        return res.status(200).json({ message: "Solicitud Actualizada", data: SolicitudActualizada });
        
    } catch (error) {
        console.error("Error al actualizar la solicitud de documento:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}