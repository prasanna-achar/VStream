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
            <div className='w-full min-h-screen bg-white'>

                {/* Header Section */}


                {/* Video List Section */}
                <div className='p-8 flex flex-col gap-4'>
                    {videos.map((video, index) => (
                        <div
                            key={video._id || video.token}
                            className={`w-full bg-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all ${index === 0 ? 'border-2 border-purple-500' : ''}`}
                        >
                            <div className='flex flex-row justify-between items-center p-6 h-48'>

                                {/* Left Side: Title and Status */}
                                <div className='flex-1 pr-4 flex flex-col justify-center h-full'>
                                    <h3 className='text-2xl text-gray-800 font-normal mb-8'>{video.title || "Title Of the Video"}</h3>

                                    <div className='text-gray-600 font-medium uppercase tracking-wide text-sm'>
                                        {video.videoUploadingStatus === "UPLOADED" ? (
                                            <span>UPLOADED</span>
                                        ) : (
                                            <span>{video.videoUploadingStatus}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Right Side: Thumbnail with Overlay */}
                                <div className='w-80 h-36 bg-black rounded-lg overflow-hidden flex-shrink-0 relative group'>
                                    {video.thumbnailLink ? (
                                        <img src={video.thumbnailLink} alt={video.title} className='w-full h-full object-cover opacity-80' />
                                    ) : (
                                        <div className='w-full h-full bg-black'></div>
                                    )}

                                    {/* Overlay Icon */}
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        {video.videoUploadingStatus === "UPLOADED" ? (
                                            <Link to={`/videos/${video.token}`} className='w-16 h-16 bg-gray-400/50 rounded-full flex items-center justify-center hover:bg-teal-400/80 transition-colors'>
                                                <Play className='text-teal-100 fill-teal-100 ml-1' size={32} />
                                            </Link>
                                        ) : (
                                            <div className='w-16 h-16 bg-gray-600/50 rounded-full flex items-center justify-center'>
                                                <Loader2 className='size-12 animate-spin text-white' />
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default MyVideos