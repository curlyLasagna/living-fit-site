import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
    handleGetAllMembershipChanges,
    handleGetMembershipChangeById,
    handleGetMembershipChangesByMemberId,
    handleCreateMembershipChange,
    handleUpdateMembershipChange,
    handleDeleteMembershipChange
} from '../controllers/membership-changes-controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Membership Changes routes
router.get('/', handleGetAllMembershipChanges);
router.get('/:changeId', handleGetMembershipChangeById);
router.get('/member/:memberId', handleGetMembershipChangesByMemberId);
router.post('/', handleCreateMembershipChange);
router.patch('/:changeId', handleUpdateMembershipChange);
router.delete('/:changeId', handleDeleteMembershipChange);

export default router;