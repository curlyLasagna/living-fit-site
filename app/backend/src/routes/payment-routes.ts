import express from 'express';
import {
    handleGetAllPaymentInformation,
    handleGetPaymentInformationById,
    handleGetPaymentInformationByMemberId,
    handleCreatePaymentInformation,
    handleUpdatePaymentInformation,
    handleDeletePaymentInformation
} from '../controllers/payment-controller';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all payment routes

// GET all payment information
router.get('/', handleGetAllPaymentInformation);

// GET payment information by ID
router.get('/:paymentInfoId', authenticateToken, handleGetPaymentInformationById);

// GET payment information by member ID
router.get('/member/:memberId', authenticateToken, handleGetPaymentInformationByMemberId);

// POST create new payment information
router.post('/', handleCreatePaymentInformation);

// PUT update payment information
router.put('/:paymentInfoId', authenticateToken, handleUpdatePaymentInformation);

// DELETE payment information
router.delete('/:paymentInfoId', authenticateToken, handleDeletePaymentInformation);

export default router;