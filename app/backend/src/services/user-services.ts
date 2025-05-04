import bcrypt from "bcryptjs";
import { members, type Member, type NewMember } from '../db/schema';
import { db } from '../utils/db';
import { eq } from 'drizzle-orm';
export async function addMember(user: NewMember) {
    const saltRounds = 5;
    const { password, ...memberDetails } = user

    if (!password) {
        throw new Error('Password is required');
    }

    const hash = await bcrypt.hash(password, saltRounds);
    console.log(user)
    const [newMember] = await db.insert(members).values({
        ...memberDetails,
        password: hash
    }).returning({
        member_id: members.memberId,
        fname: members.fname,
        lname: members.lname,
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