import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signUp = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json({ message: 'El usuario ya existe' });

        const newUser = new User({
            nombre,
            email,
            password: await User.encryptPassword(password),
            roles: [rol],
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser._id, roles: savedUser.roles },
            process.env.JWT_SECRET,
            { expiresIn: 86400 }
        );

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });

        const matchPassword = await User.comparePassword(password, userFound.password);
        if (!matchPassword) return res.status(401).json({ token: null, message: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: userFound._id, roles: userFound.roles },
            process.env.JWT_SECRET,
            { expiresIn: 86400 }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
