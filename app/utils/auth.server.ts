import {createCookieSessionStorage, json, redirect} from "@remix-run/node";
import {prisma} from "~/db.server";
import {LoginForm, RegisterForm} from "~/utils/types.server";
import {createUser} from "~/utils/user.server";
import bcrypt from "bcryptjs";


const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'wgb-session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

export async function createUserSession(userId: number, redirectTo: string) {
    const session = await storage.getSession()
    session.set('userId', userId.toString())
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

export async function register(user: RegisterForm) {
    const exists = await prisma.user.count({ where: { email: user.email } });
    if (exists) {
        return json(
            { error: `User already exists with that email` },
            { status: 400 }
        );
    }
    const existingUsername = await prisma.user.count({where: { username: user.username}});
    if (existingUsername) {
        return json(
            { error: `Username is already in use` },
            { status: 400 }
        );
    }

    const newUser = await createUser(user);
    if (!newUser) {
        return json(
            {
                error: `Something went wrong trying to create a new user.`,
                fields: { email: user.email, password: user.password },
            },
            { status: 400 }
        );
    }

    return createUserSession(newUser.id, '/');
}

export async function login({ email, password }: LoginForm) {
    // 2
    const user = await prisma.user.findUnique({
        where: { email },
    })

    // 3
    if (!user || !(await bcrypt.compare(password, user.password)))
        return json({ error: `Incorrect login` }, { status: 400 })

    // 4
    return createUserSession(user.id, "/");
}

export async function requireUserId(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get('userId')

    if (!userId || isNaN(Number(userId))) {
        throw redirect(`/login`)
    }

    return Number(userId)
}

function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'))
}

async function getUserId(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get('userId')

    if (!userId || isNaN(Number(userId))) return null

    return Number(userId)
}

export async function getUser(request: Request) {
    const userId = await getUserId(request)

    if (typeof userId !== 'number') {
        return null
    }

    try {
        return await prisma.user.findUnique({
            where: {id: userId},
            select: {id: true, email: true, firstName: true, lastName: true,username: true, role: true},
        })
    } catch {
        throw logout(request)
    }
}

export async function logout(request: Request) {
    const session = await getUserSession(request)
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}