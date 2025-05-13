import { Request, Response } from 'express';
import {
    getAllTransactions,
    getTransactionById,
    getTransactionsByMemberId,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from '../services/transaction-services';

export const handleGetAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await getAllTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
    }
};

export const handleGetTransactionById = async (req: Request, res: Response) => {
    try {
        const transactionId = parseInt(req.params.transactionId);
        const transaction = await getTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
    }
};

export const handleGetTransactionsByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = parseInt(req.params.memberId);
        const transactions = await getTransactionsByMemberId(memberId);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
    }
};

export const handleCreateTransaction = async (req: Request, res: Response) => {
    try {
        const { memberId, paymentInfoId, price, type } = req.body;
        const newTransaction = await createTransaction({ memberId, paymentInfoId, price, type });
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
};

export const handleUpdateTransaction = async (req: Request, res: Response) => {
    try {
        const transactionId = parseInt(req.params.transactionId);
        const updatedTransaction = await updateTransaction(transactionId, req.body);
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
};

export const handleDeleteTransaction = async (req: Request, res: Response) => {
    try {
        const transactionId = parseInt(req.params.transactionId);
        const deleted = await deleteTransaction(transactionId);
        if (!deleted) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
};
