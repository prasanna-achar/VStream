import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import videoUploadSchema from '../TypeSchemas/VideoUploadSchema';
import { useVideoStore } from '../store/VideoStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Upload, Image as ImageIcon, FileVideo, X } from 'lucide-react';

function VideoUploadForm() {

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const navigate = useNavigate();
  const { uploadVideo, isLoading } = useVideoStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(videoUploadSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  })

  const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

  const onSubmit = (data) => {
    const videoFile = data.video[0];
    const thumbFile = data.thumbnail[0];
    const formData = new FormData();
    if (videoFile.size > MAX_VIDEO_SIZE) {
      setError("video", { message: "Video must be under 100MB" });
      return;
    }

    if (!videoFile.type.startsWith("video/")) {
      setError("video", { message: "File must be a video" });
      return;
    }

    if (!thumbFile.type.startsWith("image/")) {
      setError("thumbnail", { message: "Thumbnail must be an image" });
      return;
    }
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbFile);

    uploadVideo(formData)
      .then(() => {
        navigate("/videos/my-videos")
      })
      .catch(() => {
        toast.error("Sorry, could not upload video. Please try again.");
        navigate("/");
      });

  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Upload New Video</h2>
          <p className="mt-2 text-gray-600">Share your content with the world</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-8 grid lg:grid-cols-2 gap-10">

            {/* LEFT SIDE: Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileVideo className="text-blue-600" size={20} />
                  Video Details
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      {...register("title")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Give your video a catchy title"
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      {...register("description")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                      rows={6}
                      placeholder="Tell viewers what your video is about..."
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Media Upload */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`
                px-8 py-3 rounded-xl font-semibold text-white shadow-lg shadow-blue-600/20 transition-all transform active:scale-95
                ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"}
                flex items-center gap-2
              `}
              >
                {!isLoading ? (
                  <>
                    <Upload size={20} />
                    Upload Video
                  </>
                ) : (
                  <>
                    <Loader2 className='animate-spin' size={20} />
                    Uploading...
                  </>
                )}
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default VideoUploadForm