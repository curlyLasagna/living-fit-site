import { db } from '../utils/db';
import { eq, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { familyMembers, qrCodes, familyMemberLogs, type FamilyMember, type NewFamilyMember } from '../schema';

export const getAllFamilyMembers = async (): Promise<FamilyMember[]> => {
    return await db.select().from(familyMembers);
};

export const getFamilyMemberById = async (familyMemberId: number): Promise<FamilyMember | null> => {
    const result = await db.select()
        .from(familyMembers)
        .where(eq(familyMembers.familyMemberId, familyMemberId))
        .limit(1);
    return result.length ? result[0] : null;
};

export const getFamilyMembersByParentId = async (parentMemberId: number): Promise<FamilyMember[]> => {
    return await db.select()
        .from(familyMembers)
        .where(eq(familyMembers.parentMemberId, parentMemberId));
};

export const createFamilyMember = async (data: Omit<NewFamilyMember, 'qrCodeUuid'>): Promise<FamilyMember> => {
    // Generate QR code UUID
    const qrCodeUuid = uuidv4();

    // Create the family member
    const [newFamilyMember] = await db.insert(familyMembers)
        .values({ ...data, qrCodeUuid })
        .returning();

    // Create QR code for family member
    await db.insert(qrCodes)
        .values({
            entityId: newFamilyMember.familyMemberId,
            entityType: 'family_member',
            locationId: data.locationId,
            status: 'active',
            issueDate: new Date(),
            uuid: qrCodeUuid
        });

    // Log the action
    await db.insert(familyMemberLogs)
        .values({
            familyMemberId: newFamilyMember.familyMemberId,
            parentMemberId: data.parentMemberId,
            action: 'add'
        });

    return newFamilyMember;
};

export const updateFamilyMember = async (
    familyMemberId: number,
    data: Partial<Omit<NewFamilyMember, 'qrCodeUuid'>>
): Promise<FamilyMember | null> => {
    const [updated] = await db.update(familyMembers)
        .set(data)
        .where(eq(familyMembers.familyMemberId, familyMemberId))
        .returning();
    return updated || null;
};

export const deleteFamilyMember = async (familyMemberId: number): Promise<boolean> => {
    // Get family member before deletion to log
    const familyMember = await getFamilyMemberById(familyMemberId);
    if (!familyMember) {
        return false;
    }

    // Log the remove action
    await db.insert(familyMemberLogs)
        .values({
            familyMemberId,
            parentMemberId: familyMember.parentMemberId,
            action: 'remove'
        });

    // Delete associated QR codes
    await db.update(qrCodes)
        .set({ status: 'revoked' })
        .where(
            and(
                eq(qrCodes.entityId, familyMemberId),
                eq(qrCodes.entityType, 'family_member')
            )
        );

    // Delete the family member
    const [deleted] = await db.delete(familyMembers)
        .where(eq(familyMembers.familyMemberId, familyMemberId))
        .returning();

    return Boolean(deleted);
};

export const getFamilyMemberLogs = async (familyMemberId: number) => {
    return await db.select()
        .from(familyMemberLogs)
        .where(eq(familyMemberLogs.familyMemberId, familyMemberId))
        .orderBy(familyMemberLogs.timestamp);
};