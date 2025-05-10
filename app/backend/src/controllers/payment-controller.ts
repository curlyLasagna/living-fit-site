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
            cardNumber,
            expirationMonth,
            expirationYear,
            billingAddress
        } = req.body;

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
            cardNumber,
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
            cardNumber,
            expirationMonth,
            expirationYear,
            billingAddress
        } = req.body;


        const updatedPaymentInfo = await updatePaymentInformation(paymentInfoId, {
            cardHolderName,
            cardNumber,
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