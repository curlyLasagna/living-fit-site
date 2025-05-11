import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
    handleGetAllFamilyMembers,
    handleGetFamilyMemberById,
    handleGetFamilyMembersByParentId,
    handleCreateFamilyMember,
    handleUpdateFamilyMember,
    handleDeleteFamilyMember,
    handleGetFamilyMemberLogs
} from '../controllers/family-members-controller';

const router = express.Router();

// GET all family members (admin only)
router.get('/', handleGetAllFamilyMembers);

// GET a specific family member by ID
router.get('/:familyMemberId', handleGetFamilyMemberById);

// GET all family members for a parent
router.get('/parent/:parentMemberId', handleGetFamilyMembersByParentId);

// POST create a new family member
router.post('/', handleCreateFamilyMember);

// PUT update a family member
router.put('/:familyMemberId', handleUpdateFamilyMember);

// DELETE a family member
router.delete('/:familyMemberId', handleDeleteFamilyMember);

// GET activity logs for a family member
router.get('/:familyMemberId/logs', handleGetFamilyMemberLogs);

export default router;