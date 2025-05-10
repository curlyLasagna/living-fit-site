import { db } from '../utils/db';
import { membershipChanges, type NewMembershipChange, type MembershipChange } from '../schema';
import { eq } from 'drizzle-orm';

export const getAllMembershipChanges = async (): Promise<MembershipChange[]> => {
    return await db.select().from(membershipChanges);
};

export const getMembershipChangeById = async (changeId: number): Promise<MembershipChange | null> => {
    const result = await db.select().from(membershipChanges).where(eq(membershipChanges.changeId, changeId)).limit(1);
    return result.length ? result[0] : null;
};

export const getMembershipChangesByMemberId = async (memberId: number): Promise<MembershipChange[]> => {
    return await db.select().from(membershipChanges).where(eq(membershipChanges.memberId, memberId));
};

export const createMembershipChange = async (data: Omit<NewMembershipChange, 'changeDate'>): Promise<MembershipChange> => {
    const membershipChangeData: NewMembershipChange = {
        ...data,
        changeDate: new Date()
    };

    const result = await db.insert(membershipChanges).values(membershipChangeData).returning();
    return result[0];
};

export const updateMembershipChange = async (changeId: number, data: Partial<Omit<NewMembershipChange, 'changeId'>>): Promise<MembershipChange | null> => {
    const result = await db.update(membershipChanges)
        .set(data)
        .where(eq(membershipChanges.changeId, changeId))
        .returning();
    return result.length ? result[0] : null;
};

export const deleteMembershipChange = async (changeId: number): Promise<boolean> => {
    const result = await db.delete(membershipChanges).where(eq(membershipChanges.changeId, changeId)).returning();
    return result.length > 0;
};