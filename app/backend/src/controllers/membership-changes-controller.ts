import type { Request, Response } from 'express';
import {
    getAllMembershipChanges,
    getMembershipChangeById,
    getMembershipChangesByMemberId,
    createMembershipChange,
    updateMembershipChange,
    deleteMembershipChange
} from '../services/membership-changes-services';

export const handleGetAllMembershipChanges = async (req: Request, res: Response) => {
    try {
        const changes = await getAllMembershipChanges();
        res.status(200).json(changes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving membership changes', error: error.message });
    }
};

export const handleGetMembershipChangeById = async (req: Request, res: Response) => {
    try {
        const changeId = parseInt(req.params.changeId);
        const change = await getMembershipChangeById(changeId);

        if (!change) {
            return res.status(404).json({ message: 'Membership change not found' });
        }

        res.status(200).json(change);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving membership change', error: error.message });
    }
};

export const handleGetMembershipChangesByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = parseInt(req.params.memberId);
        const changes = await getMembershipChangesByMemberId(memberId);
        res.status(200).json(changes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving membership changes', error: error.message });
    }
};

export const handleCreateMembershipChange = async (req: Request, res: Response) => {
    try {
        const { memberId, changeType, oldValue, newValue } = req.body;

        const newChange = await createMembershipChange({
            memberId,
            changeType,
            oldValue,
            newValue
        });

        res.status(201).json(newChange);
    } catch (error) {
        res.status(500).json({ message: 'Error creating membership change', error: error.message });
    }
};

export const handleUpdateMembershipChange = async (req: Request, res: Response) => {
    try {
        const changeId = parseInt(req.params.changeId);
        const { memberId, changeType, oldValue, newValue } = req.body;

        const updatedChange = await updateMembershipChange(changeId, {
            memberId,
            changeType,
            oldValue,
            newValue
        });

        if (!updatedChange) {
            return res.status(404).json({ message: 'Membership change not found' });
        }

        res.status(200).json(updatedChange);
    } catch (error) {
        res.status(500).json({ message: 'Error updating membership change', error: error.message });
    }
};

export const handleDeleteMembershipChange = async (req: Request, res: Response) => {
    try {
        const changeId = parseInt(req.params.changeId);
        const deleted = await deleteMembershipChange(changeId);

        if (!deleted) {
            return res.status(404).json({ message: 'Membership change not found' });
        }

        res.status(200).json({ message: 'Membership change deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting membership change', error: error.message });
    }
};