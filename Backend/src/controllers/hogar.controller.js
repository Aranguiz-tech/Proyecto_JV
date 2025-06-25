import { AppDataSource } from "../config/configDb.js";

    export const createHogar = async (req, res) => {
    const { direccion } = req.body;
    try {
        const hogarRepo = AppDataSource.getRepository("Hogar");

        const hogarExistente = await hogarRepo.findOne({ where: { direccion } });
        if (hogarExistente) {
            return res.status(400).json({ message: "La dirección ya está registrada" });
        }

        const nuevoHogar = hogarRepo.create({ direccion });
        await hogarRepo.save(nuevoHogar);

        return res.status(201).json(nuevoHogar);
    } catch (error) {
        console.error("Error al crear hogar:", error);
        return res.status(500).json({ mensaje: "Error del servidor" });
    }
};
