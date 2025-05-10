import { db } from '../utils/db';
import { locations } from '../schema';
import type { NewLocation } from '../schema';
import { eq } from 'drizzle-orm';

// Get all locations
export async function getAllLocations() {
    return db.select().from(locations);
}

// Get a single location by ID
export async function getLocationById(id: number) {
    const result = await db.select().from(locations).where(eq(locations.locationId, id)).limit(1);
    return result[0];
}

// Create a new location
export async function createLocation(newLocation: NewLocation) {
    const [created] = await db.insert(locations).values(newLocation).returning();
    return created;
}

// Update a location
export async function updateLocation(id: number, data: Partial<NewLocation>) {
    const updated = await db.update(locations)
        .set(data)
        .where(eq(locations.locationId, id))
        .returning();
    return updated[0] || null;
}

// Delete a location
export async function deleteLocation(id: number) {
    const deleted = await db.delete(locations)
        .where(eq(locations.locationId, id))
        .returning();
    return deleted[0] || null;
}