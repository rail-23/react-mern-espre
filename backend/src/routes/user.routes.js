import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import { isDecano } from '../middleware/verificarRoles.js'; 

const router = Router();

router.post('/', [verifyToken, isDecano], userCtrl.crearUsuario); // Solo permitimos acceso a decano

export default router;
