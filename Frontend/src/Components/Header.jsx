import React, { useEffect } from 'react'
import authStore from '../store/AuthStore'
import { Link } from "react-router-dom"
import useProfileStore from '../store/ProfileStore'
function Header() {
  const { AuthUser } = authStore()

  const { profile, getProfile, isLoading: isProfileLoading } = useProfileStore()

  useEffect(() => {
    getProfile()
    console.log(profile)
  }, [])

  useEffect(() => {
  }, [AuthUser])

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="/VStream Logo in Blue and Gray.png"
            alt="Logo"
            className="w-8 h-8 rounded-2xl"
          />
          <h1 className="text-2xl font-bold text-blue-600">VStream</h1>
        </div>

        {/* Menu Section */}
        <ul className="flex items-center space-x-6 text-gray-700 font-medium">
          {AuthUser ? (
            <>
              <li className="cursor-pointer hover:text-blue-600 transition">
                <Link to="/videos">Explore</Link>
              </li>
              <li className=" cursor-pointer hover:text-blue-600 transition">
                <Link
                  className='flex gap-2'
                  to="/profile">
                  {
                    profile.avatarUrl ? (
                      <img src={profile.avatarUrl} alt="Profile" className="w-12 h-12 rounded-full" />
                    ) : (
                      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-8 h-8 rounded-full" />
                    )
                  }
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="cursor-pointer hover:text-blue-600 transition">
                <Link to="/login">Login</Link>

              </li>
              <li className="px-4 py-1 rounded-md bg-blue-600 text-white 
                              cursor-pointer hover:bg-blue-700 transition">
                <Link to="/register">Sign Up</Link>

              </li>
            </>
          )}
        </ul>

      </div>
    </nav>
  )
}

export default Header
