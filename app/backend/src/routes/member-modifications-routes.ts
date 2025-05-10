import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
    handleGetAllMemberModifications,
    handleGetMemberModificationById,
    handleGetMemberModificationsByMemberId,
    handleGetMemberModificationsByType,
    handleCreateMemberModification,
    handleUpdateMemberModification,
    handleDeleteMemberModification
} from '../controllers/member-modifications-controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Member Modifications routes
router.get('/', handleGetAllMemberModifications);
router.get('/:modificationId', handleGetMemberModificationById);
router.get('/member/:memberId', handleGetMemberModificationsByMemberId);
router.get('/type/:type', handleGetMemberModificationsByType);
router.post('/', handleCreateMemberModification);
router.patch('/:modificationId', handleUpdateMemberModification);
router.delete('/:modificationId', handleDeleteMemberModification);

export default router;