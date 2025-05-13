import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { v4 as uuidv4 } from 'uuid';
import * as schema from './schema.ts';

async function main() {
    const db = drizzle(process.env.DB_URL ?? "postgresql://admin:group6@localhost:5432/living_fit");
    await reset(db, schema);

    // Insert locations
    const locationsData = [
        { name: "Hampstead", address: "2320 Hanover Pike, Unit 6, Hampstead, MD 21074" },
        { name: "Glen Burnie", address: "7714 Ritchie Hwy, Glen Burnie, MD 21061" },
        { name: "Middle River", address: "118 Carroll Island Rd, Middle River, MD 21220" },
        { name: "Towson", address: "123 York Rd, Towson, MD 21204" },
        { name: "Columbia", address: "456 Columbia Mall, Columbia, MD 21044" }
    ];
    const insertedLocations = await db.insert(schema.locations).values(locationsData).returning();

    // Insert fees for each location
    const feesData = insertedLocations.map(location => ({
        locationId: location.locationId,
        baseMonthlyFee: "50.00",
        joiningFee: "100.00",
        annualFee: "500.00",
        effectiveDate: new Date("2024-01-01"),
    }));
    await db.insert(schema.fees).values(feesData);

    // Insert members
    const membersData = [
        {
            fname: "Alice",
            lname: "Smith",
            address: "123 Main St, Baltimore, MD 21201",
            email: "alice@example.com",
            phone: "555-1234",
            password: "hashedpassword1",
            joinDate: new Date("2024-01-15"),
            membershipStatus: "active",
            locationId: insertedLocations[0].locationId,
        },
        {
            fname: "Bob",
            lname: "Johnson",
            address: "456 Elm St, Baltimore, MD 21202",
            email: "bob@example.com",
            phone: "555-5678",
            password: "hashedpassword2",
            joinDate: new Date("2024-01-20"),
            membershipStatus: "active",
            locationId: insertedLocations[1].locationId,
        },
        {
            fname: "Carol",
            lname: "Williams",
            address: "789 Oak St, Baltimore, MD 21203",
            email: "carol@example.com",
            phone: "555-9012",
            password: "hashedpassword3",
            joinDate: new Date("2024-02-01"),
            membershipStatus: "active",
            locationId: insertedLocations[2].locationId,
        },
        {
            fname: "David",
            lname: "Brown",
            address: "321 Pine St, Baltimore, MD 21204",
            email: "david@example.com",
            phone: "555-3456",
            password: "hashedpassword4",
            joinDate: new Date("2024-02-15"),
            membershipStatus: "active",
            locationId: insertedLocations[3].locationId,
        },
        {
            fname: "Emma",
            lname: "Davis",
            address: "654 Maple St, Baltimore, MD 21205",
            email: "emma@example.com",
            phone: "555-7890",
            password: "hashedpassword5",
            joinDate: new Date("2024-03-01"),
            membershipStatus: "active",
            locationId: insertedLocations[4].locationId,
        },
        {
            fname: "Frank",
            lname: "Miller",
            address: "987 Cedar St, Baltimore, MD 21206",
            email: "frank@example.com",
            phone: "555-2345",
            password: "hashedpassword6",
            joinDate: new Date("2024-03-15"),
            membershipStatus: "active",
            locationId: insertedLocations[0].locationId,
        },
        {
            fname: "Grace",
            lname: "Wilson",
            address: "147 Birch St, Baltimore, MD 21207",
            email: "grace@example.com",
            phone: "555-6789",
            password: "hashedpassword7",
            joinDate: new Date("2024-04-01"),
            membershipStatus: "active",
            locationId: insertedLocations[1].locationId,
        },
        {
            fname: "Henry",
            lname: "Moore",
            address: "258 Walnut St, Baltimore, MD 21208",
            email: "henry@example.com",
            phone: "555-0123",
            password: "hashedpassword8",
            joinDate: new Date("2024-04-15"),
            membershipStatus: "active",
            locationId: insertedLocations[2].locationId,
        },
        {
            fname: "Ivy",
            lname: "Taylor",
            address: "369 Spruce St, Baltimore, MD 21209",
            email: "ivy@example.com",
            phone: "555-4567",
            password: "hashedpassword9",
            joinDate: new Date("2024-05-01"),
            membershipStatus: "active",
            locationId: insertedLocations[3].locationId,
        },
        {
            fname: "Jack",
            lname: "Anderson",
            address: "741 Ash St, Baltimore, MD 21210",
            email: "jack@example.com",
            phone: "555-8901",
            password: "hashedpassword10",
            joinDate: new Date("2024-05-15"),
            membershipStatus: "active",
            locationId: insertedLocations[4].locationId,
        }
    ];
    const insertedMembers = await db.insert(schema.members).values(membersData).returning();

    // Insert payment information for each member
    const paymentInformationData = insertedMembers.map(member => ({
        memberId: member.memberId,
        cardHolderName: `${member.fname} ${member.lname}`,
        cardNumber: `${Math.floor(1000 + Math.random() * 9000)}`,
        expirationMonth: String(Math.floor(1 + Math.random() * 12)).padStart(2, '0'),
        expirationYear: String(new Date().getFullYear() + Math.floor(Math.random() * 5)),
        billingAddress: member.address,
    }));
    const insertedPaymentInfos = await db.insert(schema.paymentInformation).values(paymentInformationData).returning();

    // Insert transactions for each member
    const transactionsData = insertedMembers.map((member, index) => ({
        memberId: member.memberId,
        paymentInfoId: insertedPaymentInfos[index].paymentInfoId,
        price: "49.99",
        transactionDate: new Date(),
        type: 'monthly fee',
    }));
    await db.insert(schema.transactions).values(transactionsData);

    // Insert monthly member fees
    const monthlyFeesData = insertedMembers.map(member => ({
        memberId: member.memberId,
        fees: "50.00",
    }));
    await db.insert(schema.monthlyMemberFees).values(monthlyFeesData);

    // Insert QR codes for each member
    const qrCodesData = insertedMembers.map(member => ({
        entityId: member.memberId,
        entityType: "member",
        locationId: member.locationId,
        status: "active",
        issueDate: new Date(),
        uuid: uuidv4(),
    }));
    await db.insert(schema.qrCodes).values(qrCodesData);

    // Insert staff
    const staffData = [
        {
            username: "admin",
            password: "adminpass",
        },
        {
            username: "manager",
            password: "managerpass",
        }
    ];
    await db.insert(schema.staff).values(staffData);

    // Insert reports
    const reportsData = [
        {
            memberId: insertedMembers[0].memberId, // Alice Smith
            locationId: insertedLocations[0].locationId,
            issueDescription: "Member reported broken equipment in the weight room",
            status: "open",
            submissionDate: new Date("2024-03-01"),
            resolutionDate: new Date("2024-03-02")
        },
        {
            memberId: insertedMembers[2].memberId, // Carol Williams
            locationId: insertedLocations[2].locationId,
            issueDescription: "Positive feedback about new yoga classes",
            status: "closed",
            submissionDate: new Date("2024-03-15"),
            resolutionDate: new Date("2024-03-16")
        },
        {
            memberId: insertedMembers[4].memberId, // Emma Davis
            locationId: insertedLocations[4].locationId,
            issueDescription: "Locker room cleanliness issues",
            status: "in_progress",
            submissionDate: new Date("2024-04-01"),
            resolutionDate: null
        },
        {
            memberId: insertedMembers[6].memberId, // Grace Wilson
            locationId: insertedLocations[1].locationId,
            issueDescription: "Request for more evening classes",
            status: "open",
            submissionDate: new Date("2024-04-15"),
            resolutionDate: null
        },
        {
            memberId: insertedMembers[8].memberId, // Ivy Taylor
            locationId: insertedLocations[3].locationId,
            issueDescription: "Minor injury during class",
            status: "closed",
            submissionDate: new Date("2024-05-01"),
            resolutionDate: new Date("2024-05-02")
        },
        {
            memberId: insertedMembers[1].memberId, // Bob Johnson
            locationId: insertedLocations[1].locationId,
            issueDescription: "Appreciation for staff assistance",
            status: "open",
            submissionDate: new Date("2024-05-15"),
            resolutionDate: null
        },
        {
            memberId: insertedMembers[3].memberId, // David Brown
            locationId: insertedLocations[3].locationId,
            issueDescription: "Temperature control issues in facility",
            status: "in_progress",
            submissionDate: new Date("2024-06-01"),
            resolutionDate: null
        }
    ];
    await db.insert(schema.reports).values(reportsData);

    console.log("Database seeded successfully!");
}

main().catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
});