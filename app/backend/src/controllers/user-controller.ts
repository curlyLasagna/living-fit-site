import {
    addMember, getUserByEmail
} from "../services/user-services"

export const handleAddMember = async (req, res,) => {
    try {
        const member = await req.body;
        console.log(member)
        const existingUser = await getUserByEmail(member)
        if (existingUser) {
            return res.status(400).json({ messsage: "Email already registered" })
        }

        const { member: newMember } = await addMember(member);
        return res.status(201).json({ message: `New member: ${newMember.email}` })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}