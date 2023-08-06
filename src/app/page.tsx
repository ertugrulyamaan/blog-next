import Image from 'next/image'
import getCurrentUser from './actions/getUserCurrent'
import getBlogs from './actions/getBlogs'
import SingleBlog from '@/components/SingleBlog'

export default async function Home() {
  const currentUser = await getCurrentUser()
  const blogs = await getBlogs()

  return (
    <main className="md:flex min-h-screen items-start justify-between px-10 md:px-24 pt-5 md:pt-10 ">
      <div className='md:mt-20 p-5'>
        <h5 className='font-bold md:w-[250px] mx-auto text-2xl sm:text-6xl italic my-auto text-white'>Welcome To My Blog Website Project</h5>
      </div>
      <div className='lg:flex'>
        {blogs.map( (blog) => (
          <div className='p-3'>
            <SingleBlog key={blog.id} data={blog} currentUser={currentUser}/>
          </div>
          ))}
      </div>
    </main>
  )
}
