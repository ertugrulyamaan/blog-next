import { getServerSession } from "next-auth";

import prisma from '../lib/prismadb'
import { authOptions } from "../api/auth/[...nextauth]/route";


export async function getSession() {
    return await getServerSession(authOptions)
}


export default async function getCurrentUser(){
    try {
        const session = await getSession()

        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email as string }
        })

        if(!currentUser) {
            return null;
        }

        return { 
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    }
    catch (err) {
        return null;
    }
}