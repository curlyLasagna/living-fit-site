import type { Request, Response } from 'express';
import {
    getAllPaymentInformation,
    getPaymentInformationById,
    getPaymentInformationByMemberId,
    createPaymentInformation,
    updatePaymentInformation,
    deletePaymentInformation
} from '../services/payment-services';

export const handleGetAllPaymentInformation = async (req: Request, res: Response) => {
    try {
        const payments = await getAllPaymentInformation();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment information', error: error.message });
    }
};

export const handleGetPaymentInformationById = async (req: Request, res: Response) => {
    try {
        const paymentInfoId = Number.parseInt(req.params.paymentInfoId);
        const paymentInfo = await getPaymentInformationById(paymentInfoId);

        if (!paymentInfo) {
            return res.status(404).json({ message: 'Payment information not found' });
        }

        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment information', error: error.message });
    }
};

export const handleGetPaymentInformationByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = Number.parseInt(req.params.memberId);
        const paymentInfo = await getPaymentInformationByMemberId(memberId);

        if (!paymentInfo) {
            return res.status(404).json({ message: 'Payment information not found for this member' });
        }

        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment information', error: error.message });
    }
};

export const handleCreatePaymentInformation = async (req: Request, res: Response) => {
    try {
        const {
            memberId,
            cardHolderName,
            cardNumberLastFour,
            expirationMonth,
            expirationYear,
            billingAddress
        } = req.body;

        // Basic validation
        if (!memberId || !cardHolderName || !cardNumberLastFour || !expirationMonth || !expirationYear || !billingAddress) {
            return res.status(400).json({ message: 'Missing required payment information fields' });
        }

        // Validate card number format (last four digits)
        if (!/^\d{4}$/.test(cardNumberLastFour)) {
            return res.status(400).json({ message: 'Card number last four must be exactly 4 digits' });
        }

        // Validate expiration date format
        if (!/^\d{2}$/.test(expirationMonth) || parseInt(expirationMonth) < 1 || parseInt(expirationMonth) > 12) {
            return res.status(400).json({ message: 'Expiration month must be a valid month (01-12)' });
        }

        if (!/^\d{4}$/.test(expirationYear)) {
            return res.status(400).json({ message: 'Expiration year must be in YYYY format' });
        }

        // Check for existing payment information for this member
        const existingPayment = await getPaymentInformationByMemberId(memberId);
        if (existingPayment) {
            return res.status(409).json({
                message: 'Payment information already exists for this member',
                existingId: existingPayment.paymentInfoId
            });
        }

        const newPaymentInfo = await createPaymentInformation({
            memberId,
            cardHolderName,
            cardNumberLastFour,
            expirationMonth,
            expirationYear,
            billingAddress
        });

        res.status(201).json(newPaymentInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment information', error: error.message });
    }
};

export const handleUpdatePaymentInformation = async (req: Request, res: Response) => {
    try {
        const paymentInfoId = Number.parseInt(req.params.paymentInfoId);
        const {
            cardHolderName,
            cardNumberLastFour,
            expirationMonth,
            expirationYear,
            billingAddress
        } = req.body;

        // Validate card number format if provided
        if (cardNumberLastFour && !/^\d{4}$/.test(cardNumberLastFour)) {
            return res.status(400).json({ message: 'Card number last four must be exactly 4 digits' });
        }

        // Validate expiration date format if provided
        if (expirationMonth && (!/^\d{2}$/.test(expirationMonth) || Number.parseInt(expirationMonth) < 1 || Number.parseInt(expirationMonth) > 12)) {
            return res.status(400).json({ message: 'Expiration month must be a valid month (01-12)' });
        }

        if (expirationYear && !/^\d{4}$/.test(expirationYear)) {
            return res.status(400).json({ message: 'Expiration year must be in YYYY format' });
        }

        const updatedPaymentInfo = await updatePaymentInformation(paymentInfoId, {
            cardHolderName,
            cardNumberLastFour,
            expirationMonth,
            expirationYear,
            billingAddress
        });

        if (!updatedPaymentInfo) {
            return res.status(404).json({ message: 'Payment information not found' });
        }

        res.status(200).json(updatedPaymentInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment information', error: error.message });
    }
};

export const handleDeletePaymentInformation = async (req: Request, res: Response) => {
    try {
        const paymentInfoId = Number.parseInt(req.params.paymentInfoId);
        const deleted = await deletePaymentInformation(paymentInfoId);

        if (!deleted) {
            return res.status(404).json({ message: 'Payment information not found' });
        }

        res.status(200).json({ message: 'Payment information deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment information', error: error.message });
    }
};