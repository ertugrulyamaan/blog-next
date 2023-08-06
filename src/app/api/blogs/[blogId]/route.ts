import getCurrentUser from "@/app/actions/getUserCurrent";
import { NextResponse } from "next/server";
import prisma from '../../../lib/prismadb'

interface Iparams {
    blogId?: string,

}


export async function DELETE(req: Request,{params}:{params:Iparams}){
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }
    const {blogId} = params

    if(!blogId || typeof blogId !== "string"){
        throw new Error("Invalid Id")
    }

    const blog = await prisma.blog.deleteMany({
        where: {
            id:blogId,
            userId:currentUser.id
        }
    })

    return NextResponse.json(blog)
} 




export async function PUT(req: Request,{params}:{params:Iparams}){
    const currentUser = await getCurrentUser()
    const json = await req.json()

    if(!currentUser) {
        return NextResponse.error()
    }
    const {blogId} = params

    if(!blogId || typeof blogId !== "string"){
        throw new Error("Invalid Id")
    }

    const updated = await prisma.blog.update({
        where: {
            id:blogId,
            userId:currentUser.id
        },
        data:json
    })

    return NextResponse.json(updated)
} 