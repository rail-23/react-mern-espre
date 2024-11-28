import { Router } from 'express';
import * as licenseCtrl from '../controllers/licensia.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import { isDecano } from '../middleware/verificarRoles.js';
import { isVicerrector } from '../middleware/verificarRoles.js';
const router = Router();

router.post('/create', verifyToken, licenseCtrl.createLicense);
router.get('/mis-licencias', verifyToken, licenseCtrl.getLicenses);
router.get('/pendientes', [verifyToken, isDecano], licenseCtrl.getPendingLicenses);
router.put('/approve/:id', [verifyToken, isDecano], licenseCtrl.approveLicense);
router.put('/reject/:id', [verifyToken, isDecano], licenseCtrl.rejectLicense);
router.get('/aprobadas', [verifyToken, isVicerrector], licenseCtrl.getApprovedLicenses);

export default router;
