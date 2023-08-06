'use client'
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {AiFillHome} from 'react-icons/ai'
import {IoCreate} from 'react-icons/io5'


interface UserMenuProps {
    currentUser: SafeUser | null;
}

const Navbar = ({currentUser}: UserMenuProps) => {

  return (
    <header>
        <nav className="bg-zinc-800 text-white flex justify-between px-4 py-6 shadow-2xl">
            <Link href={'/'} className="mx-2">{currentUser?.name}</Link>

            <div className="flex gap-4">
                <Link href={'/'} className="flex items-center gap-1"><AiFillHome size={20}/> <span className="hidden min-[350px]:flex">Home</span></Link>
                <Link href={`${currentUser ? '/create-blog' : '/register'}` } className="flex items-center gap-1"><IoCreate size={20}/> <span className="hidden min-[350px]:flex">Create</span></Link>
                {currentUser ? <button onClick={()=> signOut()}>Sign Out</button> : <Link href={'/register'}>Register</Link>}
            
            </div>
        </nav>
    </header>
  )
}

export default Navbar