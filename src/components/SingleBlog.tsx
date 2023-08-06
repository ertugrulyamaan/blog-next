'use client'

import { SafeBlogs, SafeUser } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BsFillPencilFill} from 'react-icons/Bs'
import axios from "axios"

interface BlogProps {
  key: string,
  data: SafeBlogs,
  currentUser?: SafeUser | null 
}

const SingleBlog = ({key, data, currentUser}:BlogProps) => {
  const router = useRouter()

  const onDelete = () => {
    try {
      axios.delete(`/api/blogs/${data.id}`)
      .then(()=> router.refresh())
      .then(()=> router.push('/'))
    }
    catch (err:any) {
      throw new Error(err)
    }  
     
  }

  
  const truncateString = (str:string, num:number) => {
    if (str?.length > num) {
      return str.slice(0,num) + '...';
    }
    else {
      return str;
    }
  }

  return (
    <div onClick={() => router.push(`/blogs/${data.id}`) } className="flex border-2 rounded border-neutral-800 bg-stone-400 p-4 cursor-pointer" >
      <div>
        
        <div className="md:w-[250px] min-h-[300px] flex flex-col gap-2 justify-start mx-auto items-start">
          <Image src={data.imageSrc} width={400} height={300} alt="Blog Image"/>
          <div className=" flex flex-col gap-2">
              <h1 className="text-lg text-slate-50">Title: {data.name}</h1>
              <p className="text-slate-200">Description: {truncateString(data.description,50)}</p>
          </div>
        </div>
        {data.userId === currentUser?.id && (
          <div className="flex gap-2 justify-end">
              <RiDeleteBin5Line size={20} onClick={onDelete} className="cursor-pointer  text-black"/>
              <BsFillPencilFill size={20} onClick={() => router.push(`/blogs/${data.id}`) } className="cursor-pointer  text-black"/>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleBlog