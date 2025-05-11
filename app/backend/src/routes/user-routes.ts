import express from 'express';
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
    handleLogin,
    handleLogout
} from '../controllers/user-controller';

const router = express.Router();

// Member Management Routes
router.post('/register', handleAddMember);

router.post('/login', handleLogin);

router.post('/logout', handleLogout)

router.get('/:memberId', handleGetMemberById);

router.patch('/:memberId', handleUpdateMember);

router.patch('/:memberId/status', handleUpdateMembershipStatus);

// Family Member Routes
router.post('/:memberId/family', handleAddFamilyMember);

router.get('/:memberId/family', handleGetFamilyMembers);

router.delete('/family/:familyMemberId', handleRemoveFamilyMember);

// QR Code Routes
router.get('/:memberId/qrcodes', handleGetMemberQRCodes);

router.patch('/qrcodes/:qrCodeId', handleUpdateQRCodeStatus);

// Member History Routes
router.get('/:memberId/changes', handleGetMembershipChanges);

router.get('/:memberId/modifications', handleGetMemberModifications);

export default router;