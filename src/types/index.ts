import { Blog, User } from '@prisma/client';

export type SafeUser = Omit <User, "createdAt" | "updateAt" | "emailVerified"> & { 
    createdAt: string, 
    updateAt: string, 
    emailVerified: string | null
};


export type SafeBlogs = Omit <Blog, "createdAt"> & {

}