import React, { useEffect } from 'react'
import { useVideoStore } from '../../store/VideoStore'
import { Link } from 'react-router-dom'
import { Loader2, Play, ArrowLeft } from 'lucide-react'

function MyVideos() {
    const { videos, getMyVideos, isLoading } = useVideoStore()

    useEffect(() => {
        getMyVideos().then()
        console.log(videos)
    }, [])

    if (isLoading) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Loader2 className='size-12 animate-spin' />
            </div>
        )
    }
    else {
        return (
            <div className='w-full min-h-screen bg-gray-100'>
                {/* Video List Section */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>My Videos</h2>
                        <span className='text-sm text-gray-500'>{videos.length} videos</span>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {videos.map((video) => (
                            <div
                                key={video._id || video.token}
                                className='group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col'
                            >
                                {/* Thumbnail Container */}
                                <div className='aspect-video bg-gray-900 relative overflow-hidden'>
                                    {video.thumbnailLink ? (
                                        <img
                                            src={video.thumbnailLink}
                                            alt={video.title}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90'
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center bg-gray-800'>
                                            <Play className='text-gray-600' size={32} />
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className='absolute top-2 right-2'>
                                        {video.videoUploadingStatus === "UPLOADED" ? (
                                            <span className='px-2 py-1 bg-green-500/90 text-white text-xs font-bold rounded shadow-sm backdrop-blur-sm'>
                                                UPLOADED
                                            </span>
                                        ) : (
                                            <span className='px-2 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded shadow-sm backdrop-blur-sm flex items-center gap-1'>
                                                <Loader2 className='size-3 animate-spin' />
                                                PROCESSING
                                            </span>
                                        )}
                                    </div>

                                    {/* Overlay Action */}
                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                        {video.videoUploadingStatus === "UPLOADED" && (
                                            <Link
                                                to={`/videos/${video.token}`}
                                                className='w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-all hover:bg-white'
                                            >
                                                <Play className='text-gray-900 ml-1' size={24} fill="currentColor" />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className='p-4 flex-1 flex flex-col'>
                                    <h3 className='text-base font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors'>
                                        {video.title || "Untitled Video"}
                                    </h3>
                                    <p className='text-sm text-gray-500 line-clamp-2 mb-3'>
                                        {video.description || "No description available"}
                                    </p>

                                    {/* Footer Actions (Optional placeholder for edit/delete) */}
                                    <div className='mt-auto pt-3 border-t border-gray-100 flex justify-end'>
                                        {/* Add Edit/Delete buttons here in future */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {videos.length === 0 && (
                        <div className='text-center py-20'>
                            <div className='bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Play className='text-gray-400' size={32} />
                            </div>
                            <h3 className='text-lg font-medium text-gray-900'>No videos yet</h3>
                            <p className='text-gray-500 mt-1 mb-6'>Upload your first video to get started!</p>
                            <Link to="/videos/upload" className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
                                Upload Video
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default MyVideos