import bcrypt from 'bcrypt';
import { members, type Member, type NewMember } from '../db/schema';
import { db } from '../utils/db';
export async function addMember(user: NewMember) {
    const saltRounds = 5;
    const { password, ...memberDetails } = user

    const hash = await bcrypt.hash(password, saltRounds);

    await db.insert(members).values({
        ...memberDetails,
        password: hash
    })
}

export function getUserByEmail() {

}