import { useEffect, useState } from 'react'

import './App.css'
import { ForgotPasswordPage, LoginPage, OtpVerificationPage, ResetPasswordPage, SignupPage } from './Pages/AuthPages'
import VideoUploadPages from './Pages/VideoPages/VideoUploadPages'
import VideoPlayer from './Components/VideoPlayer'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './Pages/HomePage'
import AuthLayout from './Layout/AuthLayout'
import authStore from './store/AuthStore'
import ExploreVideos from './Pages/VideoPages/ExploreVideos'
import Layout from './Pages/Layout'
import ViewVideoPage from './Pages/VideoPages/ViewVideoPage'
import { Loader2 } from 'lucide-react'
import MyVideos from './Pages/VideoPages/MyVideos'
import ProfilePage from './Pages/ProfilePages/ProfilePage'
import EditProfilePage from './Pages/ProfilePages/EditProfilePage'

function App() {


  const { AuthUser, getme, isCheckingAuth } = authStore();





  const isLoading = authStore((state) => (state.isLoading));

  useEffect(() => {
    getme().catch((err) => {
      console.error("Authentication check failed:", err);
      // Optional: Redirect to login or just let the auth state remain null
    });
  }
    , [])
  console.log(AuthUser)
  if (isCheckingAuth) {
    return (<div className='w-screen h-screen flex items-center justify-center'>
      <Loader2 className='size-12 animate-spin' />
    </div>)
  }
  else {
    return (
      <div className='w-full h-screen bg-gray-100'>
        <Toaster position='top-right' />
        <Routes>

          <Route path='/' element={<Layout ><HomePage /></Layout>} />


          <Route path="/login" element={!AuthUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!AuthUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/verify/:token" element={!AuthUser ? <OtpVerificationPage /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={!AuthUser ? <ForgotPasswordPage /> : <Navigate to="/" />} />
          <Route path="/reset-password/:token" element={!AuthUser ? <ResetPasswordPage /> : <Navigate to="/" />} />


          <Route path="/videos" element={AuthUser ? <Layout><ExploreVideos /></Layout> : <Navigate to="/login" />} />
          <Route path="/videos/:token" element={AuthUser ? <Layout><ViewVideoPage /></Layout> : <Navigate to="/login" />} />
          <Route path="/videos/upload" element={AuthUser ? <VideoUploadPages /> : <Navigate to="/login" />} />
          <Route path="/videos/my-videos" element={AuthUser ? <Layout><MyVideos /></Layout> : <Navigate to="/login" />} />

          <Route path="/profile" element={AuthUser ? <Layout><ProfilePage /></Layout> : <Navigate to="/login" />} />
          <Route path="/profile/edit" element={AuthUser ? <Layout><EditProfilePage /></Layout> : <Navigate to="/login" />} />

        </Routes>
      </div>
    );
  }


}

export default App
