import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
    handleAddMember,
    handleGetMemberById,
    handleUpdateMember,
    handleUpdateMembershipStatus,
    handleAddFamilyMember,
    handleGetFamilyMembers,
    handleRemoveFamilyMember,
    handleGetMemberQRCodes,
    handleUpdateQRCodeStatus,
    handleGetMembershipChanges,
    handleGetMemberModifications,
    handleLogin
} from '../controllers/user-controller';

const router = express.Router();

// Member Management Routes
router.post('/register', handleAddMember);

router.post('/login', handleLogin);

router.get('/:memberId', authenticateToken, handleGetMemberById);

router.patch('/:memberId', authenticateToken, handleUpdateMember);

router.patch('/:memberId/status', authenticateToken, handleUpdateMembershipStatus);

// Family Member Routes
router.post('/:memberId/family', authenticateToken, handleAddFamilyMember);

router.get('/:memberId/family', authenticateToken, handleGetFamilyMembers);

router.delete('/family/:familyMemberId', authenticateToken, handleRemoveFamilyMember);

// QR Code Routes
router.get('/:memberId/qrcodes', authenticateToken, handleGetMemberQRCodes);

router.patch('/qrcodes/:qrCodeId', authenticateToken, handleUpdateQRCodeStatus);

// Member History Routes
router.get('/:memberId/changes', authenticateToken, handleGetMembershipChanges);

router.get('/:memberId/modifications', authenticateToken, handleGetMemberModifications);

export default router;