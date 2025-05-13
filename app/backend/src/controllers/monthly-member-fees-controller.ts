import { Request, Response } from 'express';
import {
    getAllMonthlyMemberFees,
    getMonthlyMemberFeeById,
    getMonthlyMemberFeeByMemberId,
    createMonthlyMemberFee,
    updateMonthlyMemberFee,
    deleteMonthlyMemberFee
} from '../services/monthly-member-fees-services';

export const handleGetAllMonthlyMemberFees = async (req: Request, res: Response) => {
    try {
        const fees = await getAllMonthlyMemberFees();
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving monthly member fees', error: error.message });
    }
};

export const handleGetMonthlyMemberFeeById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const fee = await getMonthlyMemberFeeById(id);
        if (!fee) {
            return res.status(404).json({ message: 'Monthly member fee not found' });
        }
        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving monthly member fee', error: error.message });
    }
};

export const handleGetMonthlyMemberFeeByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = parseInt(req.params.memberId);
        const fee = await getMonthlyMemberFeeByMemberId(memberId);
        if (!fee) {
            return res.status(404).json({ message: 'Monthly member fee not found' });
        }
        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving monthly member fee', error: error.message });
    }
};

export const handleCreateMonthlyMemberFee = async (req: Request, res: Response) => {
    try {
        const newFee = await createMonthlyMemberFee(req.body);
        res.status(201).json(newFee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating monthly member fee', error: error.message });
    }
};

export const handleUpdateMonthlyMemberFee = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedFee = await updateMonthlyMemberFee(id, req.body);
        if (!updatedFee) {
            return res.status(404).json({ message: 'Monthly member fee not found' });
        }
        res.status(200).json(updatedFee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating monthly member fee', error: error.message });
    }
};

export const handleDeleteMonthlyMemberFee = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await deleteMonthlyMemberFee(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Monthly member fee not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting monthly member fee', error: error.message });
    }
};
