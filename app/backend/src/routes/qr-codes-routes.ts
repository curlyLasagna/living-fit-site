import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
    handleGetAllQRCodes,
    handleGetQRCodeById,
    handleGetMemberQRCodes,
    handleGetFamilyMemberQRCodes,
    handleCreateQRCode,
    handleUpdateQRCodeStatus,
    handleDeleteQRCode,
    handleValidateQRCode
} from '../controllers/qr-codes-controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// QR Code routes
router.get('/', handleGetAllQRCodes);
router.get('/:qrCodeId', handleGetQRCodeById);
router.get('/member/:memberId', handleGetMemberQRCodes);
router.get('/family/:familyMemberId', handleGetFamilyMemberQRCodes);
router.post('/', handleCreateQRCode);
router.patch('/:qrCodeId', handleUpdateQRCodeStatus);
router.delete('/:qrCodeId', handleDeleteQRCode);
router.post('/validate', handleValidateQRCode);

export default router;