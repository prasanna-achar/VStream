import React, { useEffect, useState } from 'react'
import useProfileStore from '../../store/ProfileStore'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function EditProfilePage() {
    const { profile, getProfile, saveProfile, uploadAvatar, isLoading } = useProfileStore()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        address: ''
    })

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        if (profile) {
            setFormData({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                bio: profile.bio || '',
                address: profile.address || ''
            })
        }
    }, [profile])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        saveProfile(formData)
            .then(() => navigate('/profile'))
            .catch((error) => {
                console.error('Error saving profile:', error)
                toast.error('Failed to save profile')
            })
    }

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const data = new FormData()
        data.append('file', file) // Key 'file' matches Postman screenshot
        await uploadAvatar(data)
    }

    if (isLoading && !profile) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Loader2 className='size-12 animate-spin' />
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-white p-8 flex justify-center'>
            <div className='w-full max-w-5xl bg-gray-200 rounded-lg p-8 flex flex-col lg:flex-row gap-12'>

                {/* Left Column: Form Fields */}
                <div className='flex-1 flex flex-col gap-6'>

                    {/* First Name */}
                    <div className='flex flex-col gap-2'>
                        <label className='bg-gray-300 w-32 py-1 px-3 rounded text-gray-800 text-sm font-medium'>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className='bg-white w-full p-3 rounded-md border-none focus:ring-2 focus:ring-teal-300 outline-none'
                        />
                    </div>

                    {/* Last Name */}
                    <div className='flex flex-col gap-2'>
                        <label className='bg-gray-300 w-32 py-1 px-3 rounded text-gray-800 text-sm font-medium'>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className='bg-white w-full p-3 rounded-md border-none focus:ring-2 focus:ring-teal-300 outline-none'
                        />
                    </div>

                    {/* Bio */}
                    <div className='flex flex-col gap-2'>
                        <label className='bg-gray-300 w-32 py-1 px-3 rounded text-gray-800 text-sm font-medium'>Bio:</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className='w-full p-3 rounded-md border-none focus:ring-2 focus:ring-teal-300 outline-none resize-none bg-white'
                        />
                    </div>

                    {/* Address */}
                    <div className='flex flex-col gap-2'>
                        <label className='bg-gray-300 w-32 py-1 px-3 rounded text-gray-800 text-sm font-medium'>Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={4}
                            className='w-full p-3 rounded-md border-none focus:ring-2 focus:ring-teal-300 outline-none resize-none bg-white'
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className='bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors self-start mt-4'
                    >
                        Save Profile
                    </button>

                </div>

                {/* Right Column: Avatar Upload */}
                <div className='w-full lg:w-80 bg-white rounded-lg p-6 flex flex-col items-center gap-8 h-fit'>
                    <div className='w-48 h-48 rounded-full bg-black overflow-hidden'>
                        {profile?.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="Avatar Preview" className='w-full h-full object-cover' />
                        ) : (
                            <div className='w-full h-full bg-black'></div>
                        )}
                    </div>

                    <label className='cursor-pointer bg-teal-300 text-black py-2 px-8 rounded-full font-medium hover:bg-teal-400 transition-colors'>
                        Upload Avatar
                        <input
                            type="file"
                            className='hidden'
                            accept="image/*"
                            onChange={handleAvatarUpload}
                        />
                    </label>
                </div>

            </div>
        </div>
    )
}

export default EditProfilePage
