import { db } from '../utils/db';
import { transactions, type Transaction, type NewTransaction } from '../schema';
import { eq } from 'drizzle-orm';

export const getAllTransactions = async (): Promise<Transaction[]> => {
    return await db.select().from(transactions);
};

export const getTransactionById = async (transactionId: number): Promise<Transaction | null> => {
    const result = await db.select().from(transactions).where(eq(transactions.transactionId, transactionId)).limit(1);
    return result.length ? result[0] : null;
};

export const getTransactionsByMemberId = async (memberId: number): Promise<Transaction[]> => {
    return await db.select().from(transactions).where(eq(transactions.memberId, memberId));
};

export const createTransaction = async (data: NewTransaction): Promise<Transaction> => {
    const [created] = await db.insert(transactions).values(data).returning();
    return created;
};

export const updateTransaction = async (transactionId: number, data: Partial<NewTransaction>): Promise<Transaction | null> => {
    const [updated] = await db.update(transactions).set(data).where(eq(transactions.transactionId, transactionId)).returning();
    return updated || null;
};

export const deleteTransaction = async (transactionId: number): Promise<boolean> => {
    const [deleted] = await db.delete(transactions).where(eq(transactions.transactionId, transactionId)).returning();
    return Boolean(deleted);
};
