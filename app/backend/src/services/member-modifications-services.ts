import { db } from '../utils/db';
import { member_modifications, type NewMemberModification, type MemberModification } from '../schema';
import { eq } from 'drizzle-orm';

export const getAllMemberModifications = async (): Promise<MemberModification[]> => {
    return await db.select().from(member_modifications);
};

export const getMemberModificationById = async (modificationId: number): Promise<MemberModification | null> => {
    const result = await db.select().from(member_modifications)
        .where(eq(member_modifications.modificationId, modificationId))
        .limit(1);
    return result.length ? result[0] : null;
};

export const getMemberModificationsByMemberId = async (memberId: number): Promise<MemberModification[]> => {
    return await db.select().from(member_modifications)
        .where(eq(member_modifications.memberId, memberId));
};

export const getMemberModificationsByType = async (
    modificationType: 'personal_info' | 'contact_info' | 'membership_status' |
        'payment_info' | 'location_change' | 'password_change' | 'family_member_update'
): Promise<MemberModification[]> => {
    return await db.select().from(member_modifications)
        .where(eq(member_modifications.modificationType, modificationType));
};

export const createMemberModification = async (
    data: Omit<NewMemberModification, 'modificationDate'>
): Promise<MemberModification> => {
    const modificationData: NewMemberModification = {
        ...data,
        modificationDate: new Date()
    };

    const result = await db.insert(member_modifications)
        .values(modificationData)
        .returning();
    return result[0];
};

export const updateMemberModification = async (
    modificationId: number,
    data: Partial<Omit<NewMemberModification, 'modificationId'>>
): Promise<MemberModification | null> => {
    const result = await db.update(member_modifications)
        .set(data)
        .where(eq(member_modifications.modificationId, modificationId))
        .returning();
    return result.length ? result[0] : null;
};

export const deleteMemberModification = async (modificationId: number): Promise<boolean> => {
    const result = await db.delete(member_modifications)
        .where(eq(member_modifications.modificationId, modificationId))
        .returning();
    return result.length > 0;
};