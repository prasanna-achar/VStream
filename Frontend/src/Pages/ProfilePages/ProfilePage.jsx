import React, { useEffect } from 'react'
import useProfileStore from '../../store/ProfileStore'
import { useVideoStore } from '../../store/VideoStore'
import { Link } from 'react-router-dom'
import { Loader2, UserCircle } from 'lucide-react'

function ProfilePage() {
    const { profile, getProfile, isLoading: isProfileLoading } = useProfileStore()
    const { videos, getMyVideos, isLoading: isVideoLoading } = useVideoStore()

    useEffect(() => {
        getProfile()
        getMyVideos()
        console.log(profile)
    }, [])

    if (isProfileLoading || isVideoLoading) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Loader2 className='size-12 animate-spin' />
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-white p-8'>

            {/* Top Section: Banner and Avatar */}
            <div className='flex flex-col md:flex-row gap-8 mb-12'>
                {/* Banner / Details Area */}
                <div className='flex-1 bg-gray-200 rounded-lg h-64 flex text-gray-500'>
                    <div className='p-8'>
                        <h2 className='text-2xl font-bold text-gray-700 mb-2'>
                            {profile.firstName} {profile.lastName}
                        </h2>
                        <p className='text-gray-600 mb-4'>{profile.bio || "No bio available"}</p>
                        <p className='text-sm text-gray-500'>{profile.address || "No address provided"}</p>
                        <Link to="/profile/edit" className='mt-4 inline-block text-blue-600 hover:underline'>
                            Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Avatar Section */}
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='w-48 h-48 rounded-full bg-black overflow-hidden border-4 border-white shadow-lg'>
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="Avatar" className='w-full h-full object-cover' />
                        ) : (
                            <div className='w-full h-full flex items-center justify-center bg-black text-white'>
                                <span className='text-sm'>Avatar</span>
                            </div>
                        )}
                    </div>
                    <h3 className='text-xl font-medium text-gray-800'>{profile.username || "User_name"}</h3>
                </div>
            </div>

            {/* Videos Section */}
            <div>
                <h3 className='text-xl text-gray-800 font-normal mb-6'>My Videos: {videos.length}</h3>

                <div className='bg-gray-200 rounded-lg p-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {videos.map((video) => (
                            <Link to={`/videos/${video.token}`} key={video._id || video.token} className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-300'>
                                <div className='aspect-video bg-black'>
                                    {video.thumbnailLink ? (
                                        <img src={video.thumbnailLink} alt={video.title} className='w-full h-full object-cover' />
                                    ) : (
                                        <div className='w-full h-full bg-black'></div>
                                    )}
                                </div>
                                <div className='p-3'>
                                    <h4 className='text-sm font-medium text-gray-800 truncate'>{video.title || "Title Of the Video"}</h4>
                                </div>
                            </Link>
                        ))}
                        {videos.length === 0 && (
                            <div className='col-span-full text-center py-8 text-gray-500'>
                                No videos uploaded yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage
