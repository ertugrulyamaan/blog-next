import prisma from '../lib/prismadb'


import React from 'react'

export default async function getBlogs() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt:'desc'
            }
        })

        const safeBlogs = blogs.map((blog) => ({
            ...blog,
            createdAt:blog.createdAt.toISOString()
        }))
        return safeBlogs
    }
    catch(err:any) {
        throw new Error(err.message)
    }
}