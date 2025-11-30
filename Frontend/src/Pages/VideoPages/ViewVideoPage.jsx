import React, { useEffect, useState } from 'react'
import VideoPlayer from '../../Components/VideoPlayer'
import { useVideoStore } from '../../store/VideoStore';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ChevronDown, ChevronUp, ArrowBigLeft, ArrowLeft } from 'lucide-react';
import useProfileStore from '../../store/ProfileStore';
function ViewVideoPage() {

  const [showDescription, setShowDescription] = useState(false);

  const [message, showMessage] = useState(false);

  const { token } = useParams();
  const [sourceLinks, setSourceLinks] = useState({});
  const { fetchVideoByToken, isLoading, currentVideo, videos, fetchVideos } = useVideoStore();

  useEffect(() => {
    fetchVideoByToken(token);
    // Fetch other videos for the sidebar if not already loaded
    if (videos.length === 0) {
      fetchVideos();
    }
  }, [token]);

  const { userProfile, getUserProfile, isLoading: isProfileLoading } = useProfileStore()



  useEffect(() => {
    if (currentVideo && currentVideo.videoLinks) {
      setSourceLinks(currentVideo.videoLinks);
    } else if (currentVideo) {
      console.warn("videoLinks not found in currentVideo", currentVideo);
      // Try to use currentVideo itself if it looks like sources
      if (currentVideo['480p'] || currentVideo['720p'] || currentVideo['1080p']) {
        setSourceLinks(currentVideo);
      }
    }
  }, [currentVideo]);

  useEffect(() => {
    if (currentVideo && currentVideo.userId) {
      getUserProfile(currentVideo.userId)
    }
  }, [currentVideo])

  if (isLoading || !currentVideo) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Loader2 className='size-12 animate-spin' />
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen   '>




      <div className='flex flex-col lg:flex-row gap-8 p-8'>

        {/* Left Column: Video Player and Details */}
        <div className='flex-1'>
          {/* Video Player Container */}
          <div className='w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-4'>
            <VideoPlayer sources={sourceLinks} />
          </div>

          {/* Video Details Box */}
          <div className='bg-gray-200 rounded-lg p-6 relative'>
            <h1 className='text-2xl text-gray-800 font-normal mb-6'>{currentVideo.title || "Title of the Video"}</h1>

            <div className='flex items-center gap-2 mb-2'>
              {userProfile?.firstName && userProfile?.lastName && userProfile?.avatarUrl && (
                <>
                  <img src={userProfile?.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full" />
                  <p className='text-gray-700 text-sm'>{userProfile.firstName + " " + userProfile.lastName}</p>
                </>
              )}
            </div>

            <div className='flex items-center gap-4 text-gray-700 text-sm mb-2' onClick={() => showMessage(!message)}>
              <span className='cursor-pointer hover:text-black'>Like |</span>
              <span className='cursor-pointer hover:text-black'>comment |</span>
              <span className='cursor-pointer hover:text-black'>share |</span>

            </div>
            {message && (
              <div className='bg-gray-200 rounded-lg p-6 mt-4'>
                <p className='text-gray-700 text-sm'>No Server is built for these features in this project yet, so the features are not working but will build this in the future</p>
              </div>
            )}

            {/* Dropdown Icon */}
            <div className='absolute bottom-4 right-4'>
              {
                showDescription ? (
                  <ChevronUp className='text-black cursor-pointer' size={32} onClick={() => setShowDescription(false)} />
                ) : (
                  <ChevronDown className='text-black cursor-pointer' size={32} onClick={() => setShowDescription(true)} />
                )
              }
            </div>
            {/* Video Description */}
            {
              showDescription && (
                <div className='bg-gray-200 rounded-lg p-6 mt-4'>
                  <h3 className='text-lg text-gray-800 font-normal mb-2'>Video Description</h3>
                  <p className='text-gray-700 text-sm'>{currentVideo.description || "Description of the Video"}</p>
                </div>
              )
            }
          </div>


        </div>

        {/* Right Column: Watch Other Videos */}
        <div className='w-full lg:w-96 flex-shrink-0'>
          <h3 className='text-lg text-gray-800 font-normal mb-4'>Watch Other Videos</h3>

          <div className='flex flex-col gap-4'>
            {videos.filter(v => v.token !== token).slice(0, 5).map((video) => (
              <Link
                to={`/videos/${video.token}`}
                key={video._id || video.token}
                className='bg-gray-200 rounded-lg p-3 flex gap-3 hover:shadow-md transition-all'
              >
                {/* Left: Title */}
                <div className='flex-1 flex flex-col justify-center items-start'>
                  <h4 className='text-sm text-gray-800 font-normal line-clamp-2'>{video.title || "Title of the Video"}</h4>
                  <p className='text-xs text-gray-600'>{video.description || "Description of the Video"}</p>
                </div>

                {/* Right: Thumbnail */}
                <div className='w-32 h-20 bg-black rounded overflow-hidden flex-shrink-0'>
                  {video.thumbnailLink ? (
                    <img src={video.thumbnailLink} alt={video.title} className='w-full h-full object-cover' />
                  ) : (
                    <div className='w-full h-full bg-black'></div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewVideoPage