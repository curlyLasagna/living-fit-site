import type { Request, Response, NextFunction } from 'express';
import {
    getAllQRCodes,
    getQRCodeById,
    getMemberQRCodes,
    getFamilyMemberQRCodes,
    createQRCode,
    updateQRCodeStatus,
    deleteQRCode,
    validateQRCode
} from '../services/qr-codes-services';

export const handleGetAllQRCodes = async (req: Request, res: Response) => {
    try {
        const qrCodes = await getAllQRCodes();
        res.status(200).json(qrCodes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving QR codes', error: error.message });
    }
};

export const handleGetQRCodeById = async (req: Request, res: Response) => {
    try {
        const qrCodeId = parseInt(req.params.qrCodeId);
        const qrCode = await getQRCodeById(qrCodeId);

        if (!qrCode) {
            return res.status(404).json({ message: 'QR code not found' });
        }

        res.status(200).json(qrCode);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving QR code', error: error.message });
    }
};

export const handleGetMemberQRCodes = async (req: Request, res: Response) => {
    try {
        const memberId = parseInt(req.params.memberId);
        const qrCodes = await getMemberQRCodes(memberId);
        res.status(200).json(qrCodes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving member QR codes', error: error.message });
    }
};

export const handleGetFamilyMemberQRCodes = async (req: Request, res: Response) => {
    try {
        const familyMemberId = parseInt(req.params.familyMemberId);
        const qrCodes = await getFamilyMemberQRCodes(familyMemberId);
        res.status(200).json(qrCodes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving family member QR codes', error: error.message });
    }
};

export const handleCreateQRCode = async (req: Request, res: Response) => {
    try {
        const { memberId, familyMemberId, locationId, status } = req.body;

        const newQRCode = await createQRCode({
            memberId,
            familyMemberId,
            locationId,
            status,
            issueDate: new Date()
        });

        res.status(201).json(newQRCode);
    } catch (error) {
        res.status(500).json({ message: 'Error creating QR code', error: error.message });
    }
};

export const handleUpdateQRCodeStatus = async (req: Request, res: Response) => {
    try {
        const qrCodeId = parseInt(req.params.qrCodeId);
        const { status } = req.body;

        if (!status || !['active', 'revoked', 'expired'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedQRCode = await updateQRCodeStatus(qrCodeId, status);

        if (!updatedQRCode) {
            return res.status(404).json({ message: 'QR code not found' });
        }

        res.status(200).json(updatedQRCode);
    } catch (error) {
        res.status(500).json({ message: 'Error updating QR code status', error: error.message });
    }
};

export const handleDeleteQRCode = async (req: Request, res: Response) => {
    try {
        const qrCodeId = parseInt(req.params.qrCodeId);
        const deleted = await deleteQRCode(qrCodeId);

        if (!deleted) {
            return res.status(404).json({ message: 'QR code not found' });
        }

        res.status(200).json({ message: 'QR code deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting QR code', error: error.message });
    }
};

export const handleValidateQRCode = async (req: Request, res: Response) => {
    try {
        const { uuid, locationId } = req.body;

        if (!uuid || !locationId) {
            return res.status(400).json({ message: 'UUID and locationId are required' });
        }

        const qrCode = await validateQRCode(uuid, locationId);

        if (!qrCode) {
            return res.status(404).json({ message: 'Invalid QR code or not valid for this location' });
        }

        res.status(200).json({ valid: true, qrCode });
    } catch (error) {
        res.status(500).json({ message: 'Error validating QR code', error: error.message });
    }
};