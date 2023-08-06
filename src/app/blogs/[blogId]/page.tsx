import { getBlogsById } from '@/app/actions/getBLogsById'
import getCurrentUser from '@/app/actions/getUserCurrent'
import BlogId from '@/components/BlogId'
import React from 'react'

interface Iparams {
  blogId:string,
}


export default async function page({ params }:{params: Iparams})  {
  
  const blog = await getBlogsById(params) 
  const currentUser = await getCurrentUser()


  return (
    <div className='min-h-screen'>
      <div>
        <BlogId name={blog?.name} description={blog?.description} imageSrc={blog?.imageSrc} blogId={blog?.id} currentUser={currentUser?.id}/>
      </div>
    </div>
  )
}
