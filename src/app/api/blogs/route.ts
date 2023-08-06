import { NextResponse } from "next/server";
import prisma from '../../lib/prismadb'


import getCurrentUser from "@/app/actions/getUserCurrent";

export async function POST(req:Request, res:Response) {
    const currentUser = await getCurrentUser()
    
    if(!currentUser) {
        return null
    }

    const body = await req.json()

    const {name, description, imageSrc} = body

    const blog = await prisma.blog.create({
        data: {
            name, 
            description, 
            imageSrc,
            userId: currentUser.id,
        }
    })
    return NextResponse.json(blog);
}

