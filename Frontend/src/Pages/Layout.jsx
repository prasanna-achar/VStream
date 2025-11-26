import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

function Layout({children}) {
  return (
    <div className='w-screen h-screen'>
        <Header / >
        {children}
    </div>
  )
}

export default Layout