import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.roles = decoded.roles;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
