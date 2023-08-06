'use client'

import ImageUpload from "@/components/ImageUpload"
import Input from "@/components/Input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"


interface InitialStateProps {
    name: string,
    imageSrc: string,
    description: string,
}


const initialState: InitialStateProps = {
    name:'',
    imageSrc:'',
    description:'',
}



const page = () => {
    const [state, setState] = useState(initialState)
    const router = useRouter()


    const setCustomValue = (id:any, value:any) => {
        setState((prevValues)=> ({
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
            axios.post('/api/blogs', state)
            .then(()=> {
                router.push('/')
            })
        }
        catch(err:any) {
            throw new Error(err.message)
        }
        router.refresh()
    }   


  return (
    <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center mx-auto py-12 min-h-screen ">
        <div className="bg-zinc-700 text-white w-full  p-5 md:w-[550px]">
            <ImageUpload value={state.imageSrc} onChange={(value)=> {setCustomValue('imageSrc',value)}}/>
        </div>
        
        <div className="flex flex-col justify-center w-fit p-2 h-[350px] sm:w-[350px] mx-auto gap-2">
            <Input
                placeholder="Blog Header"
                name="name"
                id='name'
                type="text"
                value={state.name}
                onChange={handleChange}
            />
            <Input   
                placeholder="Blog Content"
                name="description"
                id='description'
                type="text"
                value={state.description}
                onChange={handleChange}
                big
            />
            <button type="submit" className="bg-green-400 p-2 rounded text-white font-semibold italic">Submit</button>
        </div>

    </form>
  )
}

export default page
