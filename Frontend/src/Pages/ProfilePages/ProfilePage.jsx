import React, { useEffect } from 'react'
import useProfileStore from '../../store/ProfileStore'
import { useVideoStore } from '../../store/VideoStore'
import { Link } from 'react-router-dom'
import { Loader2, MapPin, Play, Edit2 } from 'lucide-react'

function ProfilePage() {
    const { profile, getProfile, isLoading: isProfileLoading } = useProfileStore()
    const { videos, getMyVideos, isLoading: isVideoLoading } = useVideoStore()

    useEffect(() => {
        getProfile()
        getMyVideos()
    }, [])

    if (isProfileLoading || isVideoLoading) {
        return (
            <div className='flex items-center justify-center w-screen h-screen bg-gray-50'>
                <Loader2 className='size-12 animate-spin text-blue-600' />
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-gray-50'>

            {/* Banner Section */}
            <div className='h-60 w-full bg-gradient-to-r from-blue-600 to-purple-600 relative'>
                <div className='absolute inset-0 bg-black/10'></div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                {/* Profile Header Card */}
                <div className='relative -mt-20 mb-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8'>
                    <div className='flex flex-col md:flex-row gap-6 items-start md:items-end'>

                        {/* Avatar */}
                        <div className='relative -mt-20 md:-mt-24 flex-shrink-0'>
                            <div className='w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white'>
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Avatar" className='w-full h-full object-cover' />
                                ) : (
                                    <div className='w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold'>
                                        {profile.username?.[0]?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className='flex-1 w-full'>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                                <div>
                                    <h1 className='text-3xl font-bold text-gray-900'>
                                        {profile.firstName} {profile.lastName}
                                    </h1>
                                    <p className='text-gray-500 font-medium'>@{profile.username}</p>
                                </div>
                                <Link
                                    to="/profile/edit"
                                    className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors'
                                >
                                    <Edit2 size={18} />
                                    Edit Profile
                                </Link>
                            </div>

                            <div className='mt-4 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-600'>
                                {profile.address && (
                                    <div className='flex items-center gap-1'>
                                        <MapPin size={16} className='text-gray-400' />
                                        <span>{profile.address}</span>
                                    </div>
                                )}
                                <div className='flex items-center gap-1'>
                                    <span className='font-semibold text-gray-900'>{videos.length}</span>
                                    <span>Videos</span>
                                </div>
                            </div>

                            {profile.bio && (
                                <p className='mt-4 text-gray-600 leading-relaxed max-w-2xl'>
                                    {profile.bio}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Videos Section */}
                <div className='mb-12'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>My Videos</h2>
                        <Link to="/videos/upload" className='text-blue-600 hover:text-blue-700 font-medium text-sm'>
                            Upload New
                        </Link>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {videos.map((video) => (
                            <Link
                                to={`/videos/${video.token}`}
                                key={video._id || video.token}
                                className='group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100'
                            >
                                {/* Thumbnail Container */}
                                <div className='aspect-video bg-gray-900 relative overflow-hidden'>
                                    {video.thumbnailLink ? (
                                        <img
                                            src={video.thumbnailLink}
                                            alt={video.title}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center bg-gray-800'>
                                            <Play className='text-gray-600' size={32} />
                                        </div>
                                    )}

                                    {/* Play Overlay */}
                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                        <div className='w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-all'>
                                            <Play className='text-gray-900 ml-1' size={24} fill="currentColor" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className='p-4 flex-1 flex flex-col'>
                                    <h3 className='text-base font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors'>
                                        {video.title || "Untitled Video"}
                                    </h3>
                                    <p className='text-sm text-gray-500 line-clamp-2'>
                                        {video.description || "No description available"}
                                    </p>
                                </div>
                            </Link>
                        ))}

                        {videos.length === 0 && (
                            <div className='col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300'>
                                <div className='w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <Play className='text-gray-400' size={32} />
                                </div>
                                <h3 className='text-lg font-medium text-gray-900'>No videos yet</h3>
                                <p className='text-gray-500 mt-1 mb-6'>Share your first video with the world!</p>
                                <Link
                                    to="/videos/upload"
                                    className='inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
                                >
                                    Upload Video
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage
