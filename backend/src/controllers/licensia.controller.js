import Licensia from '../models/Licensia.js'

export const createLicense = async (req, res) => {
    try {
        const {
            licenseType,
            fullName,
            subject,
            reason,
            durationDays,
            phoneReference,
            licenseDate
        } = req.body;

        if (!licenseType || !fullName || !subject || !reason || !durationDays || !phoneReference || !licenseDate) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const expirationDate = new Date(licenseDate);
        expirationDate.setDate(expirationDate.getDate() + parseInt(durationDays));

        const license = new Licensia({ // Usamos `Licensia` aquí
            studentId: req.userId,
            licenseType,
            fullName,
            subject,
            reason,
            durationDays: parseInt(durationDays),
            phoneReference,
            licenseDate,
            expirationDate
        });

        const newLicense = await license.save();
        res.status(201).json({ message: 'Licencia creada con éxito', license: newLicense });
    } catch (error) {
        console.error('Error al crear la licencia:', error);
        res.status(500).json({ message: 'Error al crear la licencia', error });
    }
};
export const editLicense = async (req, res) => {
    try {
        const license = await Licensia.findOne({ _id: req.params.id, studentId: req.userId }); // Usamos `Licensia` aquí

        if (!license) return res.status(404).json({ message: 'Licencia no encontrada' });
        if (license.edited) return res.status(400).json({ message: 'La licencia ya fue editada anteriormente' });

        const { licenseType, fullName, subject, reason, durationDays, phoneReference } = req.body;

        Object.assign(license, {
            licenseType,
            fullName,
            subject,
            reason,
            durationDays,
            phoneReference
        });
        license.edited = true;

        await license.save();
        res.status(200).json({ message: 'Licencia actualizada con éxito', license });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la licencia', error });
    }
};
export const approveLicense = async (req, res) => {
    try {
        const license = await Licensia.findById(req.params.id);

        if (!license) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }

        if (license.status !== 'pending') {
            return res.status(400).json({ message: 'Solo se pueden aprobar licencias pendientes' });
        }

        license.status = 'approved';
        const updatedLicense = await license.save();

        res.status(200).json({ message: 'Licencia aprobada con éxito', license: updatedLicense });
    } catch (error) {
        console.error('Error al aprobar la licencia:', error);
        res.status(500).json({ message: 'Error al aprobar la licencia', error });
    }
};
export const completeLicense = async (req, res) => {
    try {
        const license = await Licensia.findById(req.params.id); // Usamos `Licensia` aquí

        if (!license) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }

        if (license.status !== 'approved') {
            return res.status(400).json({ message: 'Solo se pueden completar licencias aprobadas' });
        }

        license.status = 'completed';
        const updatedLicense = await license.save();

        res.status(200).json({ message: 'Licencia completada con éxito', license: updatedLicense });
    } catch (error) {
        console.error('Error al completar la licencia:', error);
        res.status(500).json({ message: 'Error al completar la licencia', error });
    }
};
export const getLicenses = async (req, res) => {
    try {
        const licenses = await Licensia.find({ studentId: req.userId }); // Usamos `Licensia` aquí
        res.status(200).json(licenses);
    } catch (error) {
        console.error('Error al obtener las licencias:', error);
        res.status(500).json({ message: 'Error al obtener las licencias' });
    }
};
export const getPendingLicenses = async (req, res) => {
    try {
        const licenses = await Licensia.find({ status: 'pending' });
        res.status(200).json(licenses);
    } catch (error) {
        console.error('Error al obtener las licencias pendientes:', error);
        res.status(500).json({ message: 'Error al obtener las licencias pendientes', error });
    }
};
export const rejectLicense = async (req, res) => {
    try {
        const license = await Licensia.findById(req.params.id);

        if (!license) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }

        if (license.status !== 'pending') {
            return res.status(400).json({ message: 'Solo se pueden rechazar licencias pendientes' });
        }

        license.status = 'rejected';
        const updatedLicense = await license.save();

        res.status(200).json({ message: 'Licencia rechazada con éxito', license: updatedLicense });
    } catch (error) {
        console.error('Error al rechazar la licencia:', error);
        res.status(500).json({ message: 'Error al rechazar la licencia', error });
    }
};

// Obtener licencias aprobadas
export const getApprovedLicenses = async (req, res) => {
    try {
        const licenses = await Licensia.find({ status: 'approved' }).populate('studentId', 'fullName');
        res.status(200).json(licenses);
    } catch (error) {
        console.error('Error al obtener licencias aprobadas:', error);
        res.status(500).json({ message: 'Error al obtener licencias aprobadas.' });
    }
};
