import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import getCurrentUser from './actions/getUserCurrent'
import Footer from '@/components/Footer'
import bg from '../../public/bg.jpg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Site',
  description: 'Blog Website Project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[url(../../public/bg.jpg)]`}>
        <Navbar currentUser={currentUser}/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
