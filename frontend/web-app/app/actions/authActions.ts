import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getToken, GetTokenParams} from "next-auth/jwt";
import {headers, cookies} from 'next/headers'
import {NextApiRequest} from "next";
export async function getSession() {
    return await getServerSession(authOptions as any)
}

export async function getCurrentUser() {

    try {
        const session = await getSession();
        if(!session) return null;
        return session.user;
    }
    catch (error) {
        return null;
    }
}

export async function getTokenWorkaround() {
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map(c => [c.name, c.value])
        )
    } as NextApiRequest;
    const params = {
        req: req
    } as GetTokenParams;
    return await getToken(params);
}
