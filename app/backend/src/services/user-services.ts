import bcrypt from "bcryptjs";
import {
    members,
    familyMembers,
    qrCodes,
    membershipChanges,
    member_modifications,
    type Member,
    type NewMember,
    type FamilyMember,
    type NewFamilyMember,
    type QrCode,
    type NewQrCode,
    type MembershipChange
} from '../db/schema';
import { db } from '../utils/db';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function addMember(user: NewMember) {
    const saltRounds = 5;
    const { password, ...memberDetails } = user

    if (!password) {
        throw new Error('Password is required');
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const [newMember] = await db.insert(members).values({
        ...memberDetails,
        password: hash
    }).returning({
        member_id: members.memberId,
        name: members.name,
        address: members.address,
        email: members.email,
        phone: members.phone,
        joinDate: members.joinDate,
        membershipStatus: members.membershipStatus,
        locationId: members.locationId
    })

    return { member: newMember }
}

export function getUserByEmail(email: string) {
    return db.select().from(members).where(eq(members.email, email)).limit(1)[0];
}

// Member Management
export async function getMemberById(memberId: number) {
    const member = await db.select().from(members)
        .where(eq(members.memberId, memberId))
        .limit(1);
    return member[0];
}

export async function updateMember(memberId: number, updates: Partial<Member>) {
    const { password, ...updateDetails } = updates;

    // Track modifications
    const oldMember = await getMemberById(memberId);
    for (const [field, newValue] of Object.entries(updateDetails)) {
        if (oldMember[field] !== newValue) {
            await db.insert(member_modifications).values({
                memberId,
                fieldModified: field,
                oldValue: String(oldMember[field]),
                newValue: String(newValue),
                modificationDate: new Date()
            });
        }
    }

    const [updatedMember] = await db.update(members)
        .set(updateDetails)
        .where(eq(members.memberId, memberId))
        .returning();
    return updatedMember;
}

export async function updateMembershipStatus(
    memberId: number,
    newStatus: 'active' | 'terminated' | 'cancelled'
) {
    const oldMember = await getMemberById(memberId);

    // Track status change
    await db.insert(membershipChanges).values({
        memberId,
        changeType: 'status',
        oldValue: oldMember.membershipStatus,
        newValue: newStatus,
        changeDate: new Date().toISOString()
    });

    const [updatedMember] = await db.update(members)
        .set({ membershipStatus: newStatus })
        .where(eq(members.memberId, memberId))
        .returning();
    return updatedMember;
}

// Family Member Management
export async function addFamilyMember(familyMember: NewFamilyMember) {
    const qrCodeUuid = uuidv4();
    const [newFamilyMember] = await db.insert(familyMembers)
        .values({ ...familyMember, qrCodeUuid })
        .returning();

    // Create QR code for family member
    await db.insert(qrCodes).values({
        familyMemberId: newFamilyMember.familyMemberId,
        locationId: newFamilyMember.locationId,
        status: 'active',
        issueDate: new Date().toISOString(),
        uuid: qrCodeUuid
    });

    return newFamilyMember;
}

export async function getFamilyMembers(parentMemberId: number) {
    return db.select()
        .from(familyMembers)
        .where(eq(familyMembers.parentMemberId, parentMemberId));
}

export async function removeFamilyMember(familyMemberId: number) {
    // Deactivate QR codes
    await db.update(qrCodes)
        .set({ status: 'revoked' })
        .where(eq(qrCodes.familyMemberId, familyMemberId));

    return db.delete(familyMembers)
        .where(eq(familyMembers.familyMemberId, familyMemberId))
        .returning();
}

// QR Code Management
export async function getMemberQRCodes(memberId: number) {
    return db.select()
        .from(qrCodes)
        .where(eq(qrCodes.memberId, memberId));
}

export async function updateQRCodeStatus(
    qrCodeId: number,
    status: 'active' | 'revoked' | 'expired'
) {
    return db.update(qrCodes)
        .set({ status })
        .where(eq(qrCodes.qrCodeId, qrCodeId))
        .returning();
}

// Member History
export async function getMembershipChanges(memberId: number) {
    return db.select()
        .from(membershipChanges)
        .where(eq(membershipChanges.memberId, memberId))
        .orderBy(desc(membershipChanges.changeDate));
}

export async function getMemberModifications(memberId: number) {
    return db.select()
        .from(member_modifications)
        .where(eq(member_modifications.memberId, memberId))
        .orderBy(desc(member_modifications.modificationDate));
}