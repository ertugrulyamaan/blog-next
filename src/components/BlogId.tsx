'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios"
import ImageUpload from "./ImageUpload"
import Input from "./Input"
import {useRouter} from 'next/navigation'
import Image from 'next/image'

interface BlogProps{
    name?: string,
    description?: string,
    imageSrc?: any,
    blogId?: string,
    currentUser?: string
}

interface InitialStateProps {
    name: string,
    description: string,
    imageSrc?: any,
}

const initialState: InitialStateProps = {
    name:"",
    description:"",
    imageSrc:"",
}

const BlogId = ({ name, description, imageSrc, blogId, currentUser }: BlogProps) => {
    const [state, setState] = useState(initialState)
    const [active, setActive] = useState(false)
    const router = useRouter()

    const onDelete = () => {
        try {
          axios.delete(`/api/blogs/${blogId}`)
          .then(()=> router.refresh())
        }
        catch (err:any) {
          throw new Error(err)
        }  
        router.push('/')
    }

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }))
    }
     
    const handleChange = ( e:ChangeEvent<HTMLInputElement> ) => {
        setState({...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        
        try {
            axios.put(`/api/blogs/${blogId}`, state)
            .then(()=> {
                router.refresh()
            })
        }
        catch(err:any) {
            throw new Error(err.message)
        }
        router.push('/')
    }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start mx-auto my-5 gap-4">
        <div className=" bg-neutral-700 py-6 px-5 rounded w-full md:w-[750px] lg:w-[950px]">   
            <div className="flex flex-col items-center ">
                <Image src={imageSrc} width={400} height={400} alt="Image" />
            </div>
            
            <div className="border-2 rounded mt-5 p-2 text-slate-200 font-semibold ">
                Title: <span className="text-white">{name}</span>
            </div>
            
            <div className="mt-2 text-slate-300 border rounded p-4">
                Description: <span className="text-white">{description}</span>
            </div>
            
            {   currentUser && (
                <div className="mt-5 flex gap-2 justify-end">
                    <button onClick={() => setActive(!active)} className="uppercase p-2 text-white italic bg-blue-500 rounded">Edit</button>
                    <button onClick={onDelete} className="uppercase p-2 text-white italic bg-red-800 rounded">Delete</button>
                </div>
            )}
         </div>
        { active && (
            <form onSubmit={handleSubmit} className="mt-2 bg-slate-300 w-full md:w-[450px]  flex flex-col ">
                <div className="p-5">
                    <ImageUpload value={state.imageSrc} onChange={(value)=> setCustomValue('imageSrc',value)}/>
                </div>

                <div className="flex flex-col justify-center w-full p-2 mt-5 mx-auto gap-2">
                    <Input type='text' id="name" name="name" placeholder="Name" value={state.name} onChange={handleChange}/>
                    <Input big type='text' id="description" name="description" placeholder="Description" value={state.description} onChange={handleChange}/>
                    <button type="submit" className="bg-green-400 p-2 rounded text-white font-semibold italic">Submit</button>
                </div>
            </form>
        )}
    </div>
  )
}

export default BlogId