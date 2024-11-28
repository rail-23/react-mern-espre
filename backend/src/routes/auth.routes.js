import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';


const router = Router();

router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signin);

export default router;
