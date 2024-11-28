export const isEstudiante = (req, res, next) => {
    if (req.roles && req.roles.includes("estudiante")) {
        return next();
    }
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de estudiante" });
};

export const isDecano = (req, res, next) => {
    if (req.roles && req.roles.includes("decano")) {
        return next();
    }
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de decano" });
};

export const isVicerrector = (req, res, next) => {
    if (req.roles && req.roles.includes("vicerrector")) {
        return next();
    }
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de vicerrector" });
};
