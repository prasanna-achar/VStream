import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className='w-screen h-screen'>
      <Header />
      {children || <Outlet />}
    </div >
  )
}

export default Layout