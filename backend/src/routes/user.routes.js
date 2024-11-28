import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';
import { verifyToken } from '../middleware/authJwt';
import { isDecano } from '../middleware/verificarRoles'; 

const router = Router();

router.post('/', [verifyToken, isDecano], userCtrl.crearUsuario); // Solo permitimos acceso a decano

export default router;
