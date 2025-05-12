import express from 'express';
import {
    handleGetAllMonthlyMemberFees,
    handleGetMonthlyMemberFeeById,
    handleGetMonthlyMemberFeeByMemberId,
    handleCreateMonthlyMemberFee,
    handleUpdateMonthlyMemberFee,
    handleDeleteMonthlyMemberFee
} from '../controllers/monthly-member-fees-controller';

const router = express.Router();

router.get('/', handleGetAllMonthlyMemberFees);
router.get('/:id', handleGetMonthlyMemberFeeById);
router.get('/member/:memberId', handleGetMonthlyMemberFeeByMemberId);
router.post('/', handleCreateMonthlyMemberFee);
router.put('/:id', handleUpdateMonthlyMemberFee);
router.delete('/:id', handleDeleteMonthlyMemberFee);

export default router;
