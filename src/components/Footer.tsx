import Link from 'next/link'
import React from 'react'
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='bg-zinc-800 text-white flex justify-around p-4'>
      <div>Blog Website</div>
      <div>© 2023 <Link href="https://ertugrulyaman.com/" target='_blank' className=' hover:opacity-70'>Ertuğrul Yaman</Link> All right reserved.</div>
      <div className='flex gap-4'>
        <Link href='https://www.linkedin.com/in/ertugrul-yaman-developer/' target='_blank'>
          <AiFillTwitterCircle size={20} color='#0072b1' />
        </Link>
        <Link href='https://twitter.com/ertugrulymndev' target='_blank'>
          <AiFillLinkedin  size={20} color='#00acee'  />
        </Link>
        <Link href='https://github.com/ertugrulyamaan' target='_blank'>
          <AiFillGithub   size={20} color='#fff'/>
        </Link>
      </div>
    </footer>
  )
}

export default Footer