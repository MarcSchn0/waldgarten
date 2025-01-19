import {RegisterForm} from "~/utils/types.server";
import {prisma} from "~/db.server";
import bcrypt from 'bcryptjs'

export const createUser = async (user: RegisterForm) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHash,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,

        },
    })
    return { id: newUser.id, email: user.email }
}
