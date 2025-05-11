import type { Request, Response, NextFunction } from 'express';
import {
    getAllMembers,
    addMember,
    getUserByEmail,
    getMemberById,
    updateMember,
    updateMembershipStatus,
    addFamilyMember,
    getFamilyMembers,
    removeFamilyMember,
    getMemberQRCodes,
    updateQRCodeStatus,
    getMembershipChanges,
    getMemberModifications,
    login
} from "../services/user-services";

// Get all users
export const handleGetUsers =  async (req, res) => {
    try {
        const users = await getAllMembers();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

export const handleAddMember = async (req: Request, res: Response) => {
    try {
        const member = req.body;
        const existingUser = await getUserByEmail(member.email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const { member: newMember } = await addMember(member);
        return res.status(201).json(newMember);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const token = await login(email, password);
        res.cookie('living_fit_token', token, {
            httpOnly: false,
            maxAge: 3600000, // 1 hour
            sameSite: 'lax',
            secure: false,
        });
        return res.status(200).json(token);
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials", error: error.message });
    }
};

export const handleLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("living_fit_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const handleGetMemberById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await getMemberById(Number(req.params.memberId));
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        const { password, ...memberInfo } = member;
        res.json(memberInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member', error });
    }
};

export const handleUpdateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedMember = await updateMember(Number(req.params.memberId), req.body);
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: 'Error updating member' });
    }
};

export const handleUpdateMembershipStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        if (!['active', 'terminated', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const updatedMember = await updateMembershipStatus(
            Number(req.params.memberId),
            status
        );
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: 'Error updating membership status' });
    }
};

export const handleAddFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const familyMember = await addFamilyMember({
            ...req.body,
            parentMemberId: Number(req.params.memberId)
        });
        res.status(201).json(familyMember);
    } catch (error) {
        res.status(500).json({ message: 'Error adding family member' });
    }
};

export const handleGetFamilyMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const familyMembers = await getFamilyMembers(Number(req.params.memberId));
        res.json(familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching family members' });
    }
};

export const handleRemoveFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeFamilyMember(Number(req.params.familyMemberId));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error removing family member' });
    }
};

export const handleGetMemberQRCodes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const qrCodes = await getMemberQRCodes(Number(req.params.memberId));
        res.json(qrCodes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching QR codes' });
    }
};

export const handleUpdateQRCodeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        if (!['active', 'revoked', 'expired'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const updatedQRCode = await updateQRCodeStatus(
            Number(req.params.qrCodeId),
            status
        );
        res.json(updatedQRCode);
    } catch (error) {
        res.status(500).json({ message: 'Error updating QR code status' });
    }
};

export const handleGetMembershipChanges = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const changes = await getMembershipChanges(Number(req.params.memberId));
        res.json(changes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching membership changes' });
    }
};

export const handleGetMemberModifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modifications = await getMemberModifications(Number(req.params.memberId));
        res.json(modifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member modifications' });
    }
};