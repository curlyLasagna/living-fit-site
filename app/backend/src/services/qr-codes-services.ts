import { db } from '../utils/db';
import { qrCodes, type NewQrCode, type QrCode } from '../schema';
import { eq, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const getAllQRCodes = async (): Promise<QrCode[]> => {
    return await db.select().from(qrCodes);
};

export const getQRCodeById = async (qrCodeId: number): Promise<QrCode | null> => {
    const result = await db.select().from(qrCodes).where(eq(qrCodes.qrCodeId, qrCodeId)).limit(1);
    return result.length ? result[0] : null;
};

export const getMemberQRCodes = async (memberId: number): Promise<QrCode[]> => {
    return await db.select().from(qrCodes).where(eq(qrCodes.memberId, memberId));
};

export const getFamilyMemberQRCodes = async (familyMemberId: number): Promise<QrCode[]> => {
    return await db.select().from(qrCodes).where(eq(qrCodes.familyMemberId, familyMemberId));
};

export const getLocationQRCodes = async (locationId: number): Promise<QrCode[]> => {
    return await db.select().from(qrCodes).where(eq(qrCodes.locationId, locationId));
};

export const createQRCode = async (data: Omit<NewQrCode, 'uuid'>): Promise<QrCode> => {
    // Generate a UUID for the QR code
    const qrCodeData: NewQrCode = {
        ...data,
        uuid: uuidv4(),
    };

    const result = await db.insert(qrCodes).values(qrCodeData).returning();
    return result[0];
};

export const updateQRCodeStatus = async (qrCodeId: number, status: 'active' | 'revoked' | 'expired'): Promise<QrCode | null> => {
    const result = await db.update(qrCodes)
        .set({ status })
        .where(eq(qrCodes.qrCodeId, qrCodeId))
        .returning();
    return result.length ? result[0] : null;
};

export const deleteQRCode = async (qrCodeId: number): Promise<boolean> => {
    const result = await db.delete(qrCodes).where(eq(qrCodes.qrCodeId, qrCodeId)).returning();
    return result.length > 0;
};

export const validateQRCode = async (uuid: string, locationId: number): Promise<QrCode | null> => {
    const result = await db.select().from(qrCodes)
        .where(
            and(
                eq(qrCodes.uuid, uuid),
                eq(qrCodes.locationId, locationId),
                eq(qrCodes.status, 'active')
            )
        )
        .limit(1);
    return result.length ? result[0] : null;
};