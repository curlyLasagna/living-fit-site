import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { v4 as uuidv4 } from 'uuid';
import * as schema from './schema.ts';

async function main() {
    const db = drizzle(process.env.DB_URL ?? "postgresql://admin:group6@localhost:5432/living_fit");
    await reset(db, schema);

    // Insert locations
    const locationsData = [
        { name: "Hampstead", address: "2320 Hanover Pike, Unit 6, Hampstead, MD 21074, United States" },
        { name: "Glen Burnie", address: "7714 Ritchie Hwy, Glen Burnie, MD 21061" },
        { name: "Middle River", address: "118 Carroll Island Rd, Middle River, MD 21220" },
    ];
    const insertedLocations = await db.insert(schema.locations).values(locationsData).returning();

    // Insert fees
    const feesData = [
        {
            locationId: insertedLocations[0].locationId,
            baseMonthlyFee: "50.00",
            joiningFee: "100.00",
            annualFee: "500.00",
            effectiveDate: new Date("2024-01-01"),
        },
        {
            locationId: insertedLocations[1].locationId,
            baseMonthlyFee: "60.00",
            joiningFee: "120.00",
            annualFee: "600.00",
            effectiveDate: new Date("2024-01-01"),
        },
        {
            locationId: insertedLocations[2].locationId,
            baseMonthlyFee: "60.00",
            joiningFee: "120.00",
            annualFee: "600.00",
            effectiveDate: new Date("2024-01-01"),
        },
    ];
    await db.insert(schema.fees).values(feesData);

    // Insert members
    const membersData = [
        {
            fname: "Alice",
            lname: "Smith",
            address: "123 Main St",
            email: "alice@example.com",
            phone: "555-1234",
            password: "hashedpassword1",
            joinDate: new Date("2024-02-01"),
            membershipStatus: "active",
            locationId: insertedLocations[0].locationId,
        },
        {
            fname: "Bob",
            lname: "Johnson",
            address: "456 Elm St",
            email: "bob@example.com",
            phone: "555-5678",
            password: "hashedpassword2",
            joinDate: new Date("2024-03-01"),
            membershipStatus: "active",
            locationId: insertedLocations[1].locationId,
        },
    ];
    const insertedMembers = await db.insert(schema.members).values(membersData).returning();

    // Insert family members
    const familyMembersData = [
        {
            parentMemberId: insertedMembers[0].memberId,
            locationId: insertedLocations[0].locationId,
            name: "Charlie Smith",
            qrCodeUuid: uuidv4(),
        },
    ];
    const insertedFamilyMembers = await db.insert(schema.familyMembers).values(familyMembersData).returning();

    // Insert qr codes
    const qrCodesData = [
        {
            entityId: insertedMembers[0].memberId,
            entityType: "member",
            locationId: insertedLocations[0].locationId,
            status: "active",
            issueDate: new Date(),
            uuid: uuidv4(),
        },
    ];
    await db.insert(schema.qrCodes).values(qrCodesData);

    // Insert staff
    const staffData = [
        {
            username: "admin",
            password: "adminpass",
        },
    ];
    await db.insert(schema.staff).values(staffData);

    // Insert payment information
    const paymentInformationData = [
        {
            memberId: insertedMembers[0].memberId,
            cardHolderName: "Alice Smith",
            cardNumber: "1234",
            expirationMonth: "12",
            expirationYear: "2028",
            billingAddress: "123 Main St",
        },
    ];
    await db.insert(schema.paymentInformation).values(paymentInformationData);

    console.log("Database seeded successfully!");
}

main().catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
});