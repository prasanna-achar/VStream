import React, { useEffect } from 'react'
import authStore from '../store/AuthStore'
import { Link } from "react-router-dom"
import useProfileStore from '../store/ProfileStore'
import { Menu, X } from 'lucide-react'
function Header() {
  const { AuthUser } = authStore()
  const { profile, getProfile, isLoading: isProfileLoading } = useProfileStore()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false)

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
  }, [AuthUser])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-gray-100 border-b border-gray-200 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <a href="https://github.com/prasanna-achar/VStream"
            className='flex items-center space-x-2' target="_blank">
            <img
              src="/VStream Logo in Blue and Gray.png"
              alt="Logo"
              className="w-8 h-8 rounded-2xl"
            />
            <h1 className="text-2xl font-bold text-blue-600">VStream</h1>
          </a>
        </div>

        {/* Desktop Menu Section */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {AuthUser ? (
            <>

              <li className="cursor-pointer hover:text-blue-600 transition">
                <Link to="/videos">Explore</Link>
              </li>




              {/* Profile Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center focus:outline-none"
                >
                  {profile?.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-blue-600 transition-all" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {AuthUser.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 transform origin-top-right transition-all z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{AuthUser.username}</p>
                      <p className="text-xs text-gray-500 truncate">{AuthUser.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/profile/edit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/videos/my-videos"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Videos
                    </Link>
                    <Link
                      to="/videos/upload"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Upload Video
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          authStore.getState().logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-5 flex flex-col space-y-4">
          {AuthUser ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium" onClick={toggleMenu}>
                <span>Profile</span>
                {
                  profile?.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-8 h-8 rounded-full" />
                  )
                }
              </Link>
              <Link to="/videos" className="text-gray-700 hover:text-blue-600 font-medium" onClick={toggleMenu}>
                Explore
              </Link>

              <Link to="/videos/my-videos" className="text-gray-700 hover:text-blue-600 font-medium" onClick={toggleMenu}>
                My Videos
              </Link>

              <Link to="/videos/upload" className="text-gray-700 hover:text-blue-600 font-medium" onClick={toggleMenu}>
                Upload
              </Link>


            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700 transition font-medium" onClick={toggleMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Header
