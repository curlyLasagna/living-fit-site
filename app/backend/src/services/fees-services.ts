import { db } from '../utils/db';
import { fees, locations } from '../schema';
import { eq } from 'drizzle-orm';
import type { NewFee } from '../schema';

// Get all fees
export async function getAllFees() {
    return db.select().from(fees);
}

// Get a single fee by ID
export async function getFeeById(id: number) {
    const result = await db.select().from(fees).where(eq(fees.feeId, id)).limit(1);
    return result[0];
}

// Create a new fee
export async function createFee(newFee: NewFee) {
    const [created] = await db.insert(fees).values(newFee).returning();
    return created;
}

// Update a fee
export async function updateFee(id: number, data: Partial<NewFee>) {
    const updated = await db.update(fees)
        .set(data)
        .where(eq(fees.feeId, id))
        .returning();
    return updated[0] || null;
}

// Delete a fee
export async function deleteFee(id: number) {
    const deleted = await db.delete(fees)
        .where(eq(fees.feeId, id))
        .returning();
    return deleted[0] || null;
}

// Get all fees for a specific location
export async function getFeesByLocation(locationId: number) {
    return db.select().from(fees).where(eq(fees.locationId, locationId));
}
