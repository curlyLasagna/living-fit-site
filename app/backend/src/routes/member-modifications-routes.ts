import express from 'express';
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

// Member Modifications routes
router.get('/', handleGetAllMemberModifications);
router.get('/:modificationId', handleGetMemberModificationById);
router.get('/member/:memberId', handleGetMemberModificationsByMemberId);
router.get('/type/:type', handleGetMemberModificationsByType);
router.post('/', handleCreateMemberModification);
router.patch('/:modificationId', handleUpdateMemberModification);
router.delete('/:modificationId', handleDeleteMemberModification);

export default router;