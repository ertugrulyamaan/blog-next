'use client'

import Input from '@/components/Input'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
interface InitialStateProps {
    name: string,
    email: string,
    password: string,
}


const initialState:InitialStateProps = {
    name: '',
    email: '',
    password: '',
}

const page = () => {
    const [state, setState] = useState(initialState)
    const router = useRouter()


    const handleChange = ( e:ChangeEvent<HTMLInputElement> ) => {
        setState({...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        
        try {
            axios.post('api/register', state)
            .then(() => (router.refresh()))
            .then(()=> setTimeout(()=> {router.push('/login')},500))
        }
        catch (err:any) {
            console.log(err.message)
        }
    }

  return (
    <form className='text-center min-h-screen bg-zinc-900' onSubmit={handleSubmit}>
        <h2 className='text-white font-extrabold text-3xl pt-5'>Register page</h2>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
            <Input 
                placeholder='Name'
                id='name'
                name='name'
                type='text'
                onChange={handleChange}
                value={state.name}
            />

            <Input 
                placeholder='Email'
                id='email'
                name='email'
                type='email'
                onChange={handleChange}
                value={state.email}
            />

            <Input 
                placeholder='*****'
                id='password'
                name='password'
                type='password'
                onChange={handleChange}
                value={state.password}
            />
            <button type='submit' className='bg-green-400 p-2 rounded text-white font-semibold italic'>Register</button>
        </div>
        <div>
            <div className='text-white w-fit   mx-auto'>Do you have an account ? <Link className='text-green-700 p-2 border-2 rounded active:drop-shadow-xl' href={'/login'}>Sign In</Link></div>
        </div>
    </form>
  )
}

export default page