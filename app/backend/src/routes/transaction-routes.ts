import express from 'express';
import {
    handleGetAllTransactions,
    handleGetTransactionById,
    handleGetTransactionsByMemberId,
    handleCreateTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction
} from '../controllers/transaction-controller';

const router = express.Router();

router.get('/', handleGetAllTransactions);
router.get('/:transactionId', handleGetTransactionById);
router.get('/member/:memberId', handleGetTransactionsByMemberId);
router.post('/', handleCreateTransaction);
router.put('/:transactionId', handleUpdateTransaction);
router.delete('/:transactionId', handleDeleteTransaction);

export default router;
