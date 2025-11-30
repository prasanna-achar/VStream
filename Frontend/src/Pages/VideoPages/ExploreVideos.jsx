import React, { useEffect } from 'react'
import { useVideoStore } from '../../store/VideoStore'
import { Loader2, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

function ExploreVideos() {

  const { videos, fetchVideos, isLoading } = useVideoStore()

  useEffect(() => {
    fetchVideos().then()
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
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Explore Videos</h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {videos.map((video) => (
              <Link
                to={`/videos/${video.token}`}
                key={video._id || video.token}
                className='group bg-gray-50 rounded-xl hover:scale-99 hover:border hover:border-blue-500 duration-300 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col'
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
          </div>

          {videos.length === 0 && (
            <div className='text-center py-20'>
              <div className='bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Play className='text-gray-400' size={32} />
              </div>
              <h3 className='text-lg font-medium text-gray-900'>No videos found</h3>
              <p className='text-gray-500 mt-1'>Be the first to upload a video!</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ExploreVideos