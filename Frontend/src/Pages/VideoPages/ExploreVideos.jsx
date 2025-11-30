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
      <div className='w-full min-h-screen bg-white'>
        {/* Header Section */}


        {/* Video List Section */}
        <div className='p-8 flex flex-col gap-4'>
          {videos.map((video, index) => (
            <Link
              to={`/videos/${video.token}`}
              key={video._id || video.token}
              className={`block w-full bg-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all ${index === 0 ? 'border-2 border-purple-500' : ''}`}
            >
              <div className='flex flex-row justify-between items-center p-6 h-48'>

                {/* Left Side: Title */}
                <div className='flex-1 pr-4 '>
                  <h3 className='text-2xl text-gray-800 font-normal'>{video.title || "Title Of the Video"}</h3>
                  <p className='text-sm text-gray-600 mt-4 overflow-hidden'>{video.description || "Description of the Video"}</p>
                </div>

                {/* Right Side: Thumbnail */}
                <div className='w-80 h-36 bg-black rounded-lg overflow-hidden flex-shrink-0'>
                  {video.thumbnailLink ? (
                    <div

                      className='w-full h-full flex items-center justify-center'
                      style={{
                        backgroundImage: `url(${video.thumbnailLink})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      <Play className='text-teal-100 fill-teal-100 ml-1' size={32} />
                    </div>
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-black'>
                      {/* Placeholder for black rectangle in design */}

                    </div>
                  )}
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default ExploreVideos