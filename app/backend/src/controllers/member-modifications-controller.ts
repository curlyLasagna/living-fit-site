import type { Request, Response } from 'express';
import {
    getAllMemberModifications,
    getMemberModificationById,
    getMemberModificationsByMemberId,
    getMemberModificationsByType,
    createMemberModification,
    updateMemberModification,
    deleteMemberModification
} from '../services/member-modifications-services';

export const handleGetAllMemberModifications = async (req: Request, res: Response) => {
    try {
        const modifications = await getAllMemberModifications();
        res.status(200).json(modifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving member modifications', error: error.message });
    }
};

export const handleGetMemberModificationById = async (req: Request, res: Response) => {
    try {
        const modificationId = parseInt(req.params.modificationId);
        const modification = await getMemberModificationById(modificationId);

        if (!modification) {
            return res.status(404).json({ message: 'Member modification not found' });
        }

        res.status(200).json(modification);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving member modification', error: error.message });
    }
};

export const handleGetMemberModificationsByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = parseInt(req.params.memberId);
        const modifications = await getMemberModificationsByMemberId(memberId);
        res.status(200).json(modifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving member modifications', error: error.message });
    }
};

export const handleGetMemberModificationsByType = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const validTypes = [
            'personal_info',
            'contact_info',
            'membership_status',
            'payment_info',
            'location_change',
            'password_change',
            'family_member_update'
        ];

        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid modification type' });
        }

        const modifications = await getMemberModificationsByType(type as any);
        res.status(200).json(modifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving member modifications', error: error.message });
    }
};

export const handleCreateMemberModification = async (req: Request, res: Response) => {
    try {
        const { memberId, modificationType, fieldModified, oldValue, newValue } = req.body;

        const newModification = await createMemberModification({
            memberId,
            modificationType,
            fieldModified,
            oldValue,
            newValue
        });

        res.status(201).json(newModification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating member modification', error: error.message });
    }
};

export const handleUpdateMemberModification = async (req: Request, res: Response) => {
    try {
        const modificationId = parseInt(req.params.modificationId);
        const { memberId, modificationType, fieldModified, oldValue, newValue } = req.body;

        const updatedModification = await updateMemberModification(modificationId, {
            memberId,
            modificationType,
            fieldModified,
            oldValue,
            newValue
        });

        if (!updatedModification) {
            return res.status(404).json({ message: 'Member modification not found' });
        }

        res.status(200).json(updatedModification);
    } catch (error) {
        res.status(500).json({ message: 'Error updating member modification', error: error.message });
    }
};

export const handleDeleteMemberModification = async (req: Request, res: Response) => {
    try {
        const modificationId = parseInt(req.params.modificationId);
        const deleted = await deleteMemberModification(modificationId);

        if (!deleted) {
            return res.status(404).json({ message: 'Member modification not found' });
        }

        res.status(200).json({ message: 'Member modification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting member modification', error: error.message });
    }
};