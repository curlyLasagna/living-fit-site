import type { Request, Response } from 'express';
import {
    getAllFamilyMembers,
    getFamilyMemberById,
    getFamilyMembersByParentId,
    createFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    getFamilyMemberLogs
} from '../services/family-members-services';

export const handleGetAllFamilyMembers = async (req: Request, res: Response) => {
    try {
        const familyMembers = await getAllFamilyMembers();
        res.status(200).json(familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving family members', error: error.message });
    }
};

export const handleGetFamilyMemberById = async (req: Request, res: Response) => {
    try {
        const familyMemberId = parseInt(req.params.familyMemberId);
        const familyMember = await getFamilyMemberById(familyMemberId);

        if (!familyMember) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        res.status(200).json(familyMember);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving family member', error: error.message });
    }
};

export const handleGetFamilyMembersByParentId = async (req: Request, res: Response) => {
    try {
        const parentMemberId = parseInt(req.params.parentMemberId);
        const familyMembers = await getFamilyMembersByParentId(parentMemberId);
        res.status(200).json(familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving family members', error: error.message });
    }
};

export const handleCreateFamilyMember = async (req: Request, res: Response) => {
    try {
        const { parentMemberId, locationId, name } = req.body;

        if (!parentMemberId || !name) {
            return res.status(400).json({ message: 'Parent member ID and name are required' });
        }

        const newFamilyMember = await createFamilyMember({
            parentMemberId,
            locationId,
            name
        });

        res.status(201).json(newFamilyMember);
    } catch (error) {
        res.status(500).json({ message: 'Error creating family member', error: error.message });
    }
};

export const handleUpdateFamilyMember = async (req: Request, res: Response) => {
    try {
        const familyMemberId = parseInt(req.params.familyMemberId);
        const { name, locationId } = req.body;

        const updatedFamilyMember = await updateFamilyMember(familyMemberId, {
            name,
            locationId
        });

        if (!updatedFamilyMember) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        res.status(200).json(updatedFamilyMember);
    } catch (error) {
        res.status(500).json({ message: 'Error updating family member', error: error.message });
    }
};

export const handleDeleteFamilyMember = async (req: Request, res: Response) => {
    try {
        const familyMemberId = parseInt(req.params.familyMemberId);
        const deleted = await deleteFamilyMember(familyMemberId);

        if (!deleted) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting family member', error: error.message });
    }
};

export const handleGetFamilyMemberLogs = async (req: Request, res: Response) => {
    try {
        const familyMemberId = parseInt(req.params.familyMemberId);
        const logs = await getFamilyMemberLogs(familyMemberId);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving family member logs', error: error.message });
    }
};