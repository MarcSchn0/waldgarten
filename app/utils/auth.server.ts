import {prisma} from "~/db.server";
import {User} from "~/utils/types.server";
import {json} from "@remix-run/node";
import bcrypt from "bcryptjs";

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({where: {email}});

    return user;
}

export async function registerUser({firstName, lastName, email, password}: User) {
    const accountExists = await prisma.user.findUnique({where: {email: email}});
    if (accountExists) {
        return json({error: "Account already exists"}, {status: 401});
    }
    console.log(password)
    console.time("test");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.time("test");
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }
    });

    return json(user);
}