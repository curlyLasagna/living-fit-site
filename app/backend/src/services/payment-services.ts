import { db } from '../utils/db';
import { paymentInformation, type NewPaymentInformation, type PaymentInformation } from '../schema';
import { eq } from 'drizzle-orm';

export const getAllPaymentInformation = async (): Promise<PaymentInformation[]> => {
    return await db.select().from(paymentInformation);
};

export const getPaymentInformationById = async (paymentInfoId: number): Promise<PaymentInformation | null> => {
    const result = await db.select().from(paymentInformation)
        .where(eq(paymentInformation.paymentInfoId, paymentInfoId))
        .limit(1);
    return result.length ? result[0] : null;
};

export const getPaymentInformationByMemberId = async (memberId: number): Promise<PaymentInformation | null> => {
    const result = await db.select().from(paymentInformation)
        .where(eq(paymentInformation.memberId, memberId))
        .limit(1);
    return result.length ? result[0] : null;
};

export const createPaymentInformation = async (
    data: Omit<NewPaymentInformation, 'createdAt' | 'updatedAt'>
): Promise<PaymentInformation> => {
    const now = new Date();
    const paymentData: NewPaymentInformation = {
        ...data,
        createdAt: now,
        updatedAt: now
    };

    const result = await db.insert(paymentInformation).values(paymentData).returning();
    return result[0];
};

export const updatePaymentInformation = async (
    paymentInfoId: number,
    data: Partial<Omit<NewPaymentInformation, 'paymentInfoId' | 'createdAt' | 'updatedAt'>>
): Promise<PaymentInformation | null> => {
    const updateData = {
        ...data,
        updatedAt: new Date()
    };

    const result = await db.update(paymentInformation)
        .set(updateData)
        .where(eq(paymentInformation.paymentInfoId, paymentInfoId))
        .returning();
    return result.length ? result[0] : null;
};

export const deletePaymentInformation = async (paymentInfoId: number): Promise<boolean> => {
    const result = await db.delete(paymentInformation)
        .where(eq(paymentInformation.paymentInfoId, paymentInfoId))
        .returning();
    return result.length > 0;
};