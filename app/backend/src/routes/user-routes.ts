import express from 'express';
import type { Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import * as userServices from '../services/user-services';
import { handleAddMember } from '../controllers/user-controller';

const router = express.Router();

// Member Management Routes
router.post('/register', handleAddMember);

router.get('/:memberId', authenticateToken, async (req: any, res: any) => {
    try {
        const member = await userServices.getMemberById(Number(req.params.memberId));
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        const { password, ...memberInfo } = member;
        res.json(memberInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member' });
    }
});

router.patch('/:memberId', authenticateToken, async (req, res) => {
    try {
        const updatedMember = await userServices.updateMember(Number(req.params.memberId), req.body);
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: 'Error updating member' });
    }
});

router.patch('/:memberId/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'terminated', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const updatedMember = await userServices.updateMembershipStatus(
            Number(req.params.memberId),
            status
        );
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: 'Error updating membership status' });
    }
});

// Family Member Routes
router.post('/:memberId/family', authenticateToken, async (req, res) => {
    try {
        const familyMember = await userServices.addFamilyMember({
            ...req.body,
            parentMemberId: Number(req.params.memberId)
        });
        res.status(201).json(familyMember);
    } catch (error) {
        res.status(500).json({ message: 'Error adding family member' });
    }
});

router.get('/:memberId/family', authenticateToken, async (req, res) => {
    try {
        const familyMembers = await userServices.getFamilyMembers(Number(req.params.memberId));
        res.json(familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching family members' });
    }
});

router.delete('/family/:familyMemberId', authenticateToken, async (req, res) => {
    try {
        await userServices.removeFamilyMember(Number(req.params.familyMemberId));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error removing family member' });
    }
});

// QR Code Routes
router.get('/:memberId/qrcodes', authenticateToken, async (req, res) => {
    try {
        const qrCodes = await userServices.getMemberQRCodes(Number(req.params.memberId));
        res.json(qrCodes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching QR codes' });
    }
});

router.patch('/qrcodes/:qrCodeId', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'revoked', 'expired'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const updatedQRCode = await userServices.updateQRCodeStatus(
            Number(req.params.qrCodeId),
            status
        );
        res.json(updatedQRCode);
    } catch (error) {
        res.status(500).json({ message: 'Error updating QR code status' });
    }
});

// Member History Routes
router.get('/:memberId/changes', authenticateToken, async (req, res) => {
    try {
        const changes = await userServices.getMembershipChanges(Number(req.params.memberId));
        res.json(changes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching membership changes' });
    }
});

router.get('/:memberId/modifications', authenticateToken, async (req, res) => {
    try {
        const modifications = await userServices.getMemberModifications(Number(req.params.memberId));
        res.json(modifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching member modifications' });
    }
});