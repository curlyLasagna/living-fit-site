import { db } from '../utils/db';
import { monthlyMemberFees, type MonthlyMemberFee, type NewMonthlyMemberFee } from '../schema';
import { eq } from 'drizzle-orm';

export const getAllMonthlyMemberFees = async (): Promise<MonthlyMemberFee[]> => {
    return await db.select().from(monthlyMemberFees);
};

export const getMonthlyMemberFeeById = async (id: number): Promise<MonthlyMemberFee | null> => {
    const result = await db.select().from(monthlyMemberFees).where(eq(monthlyMemberFees.id, id)).limit(1);
    return result.length ? result[0] : null;
};

export const getMonthlyMemberFeeByMemberId = async (memberId: number): Promise<MonthlyMemberFee | null> => {
    const result = await db.select().from(monthlyMemberFees).where(eq(monthlyMemberFees.memberId, memberId)).limit(1);
    return result.length ? result[0] : null;
};

export const createMonthlyMemberFee = async (data: NewMonthlyMemberFee): Promise<MonthlyMemberFee> => {
    const [created] = await db.insert(monthlyMemberFees).values(data).returning();
    return created;
};

export const updateMonthlyMemberFee = async (id: number, data: Partial<NewMonthlyMemberFee>): Promise<MonthlyMemberFee | null> => {
    const [updated] = await db.update(monthlyMemberFees).set(data).where(eq(monthlyMemberFees.id, id)).returning();
    return updated || null;
};

export const deleteMonthlyMemberFee = async (id: number): Promise<boolean> => {
    const [deleted] = await db.delete(monthlyMemberFees).where(eq(monthlyMemberFees.id, id)).returning();
    return Boolean(deleted);
};
