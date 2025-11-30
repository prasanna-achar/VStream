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
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="text-blue-600" size={20} />
                Media Files
              </h3>

              {/* Video Upload Zone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Video File</label>
                <div className="relative group">
                  {videoPreview ? (
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                      <video src={videoPreview} controls className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setVideoPreview(null)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all group-hover:border-blue-400">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Upload size={24} />
                        </div>
                        <p className="mb-1 text-sm text-gray-500"><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-400">MP4, WebM or Ogg (MAX. 100MB)</p>
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        {...register("video", {
                          onChange: (e) => {
                            const file = e.target.files?.[0];
                            if (file) setVideoPreview(URL.createObjectURL(file));
                          }
                        })}
                      />
                    </label>
                  )}
                  {errors.video && <p className="text-red-500 text-xs mt-1">{errors.video.message}</p>}
                </div>
              </div>

              {/* Thumbnail Upload Zone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Thumbnail</label>
                <div className="relative group">
                  {thumbnailPreview ? (
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
                      <img src={thumbnailPreview} className="w-full h-full object-cover" alt="Thumbnail preview" />
                      <button
                        type="button"
                        onClick={() => setThumbnailPreview(null)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all group-hover:border-blue-400">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <ImageIcon size={24} />
                        </div>
                        <p className="mb-1 text-sm text-gray-500"><span className="font-semibold text-purple-600">Click to upload</span> thumbnail</p>
                        <p className="text-xs text-gray-400">PNG, JPG or GIF</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("thumbnail", {
                          onChange: (e) => {
                            const file = e.target.files?.[0];
                            if (file) setThumbnailPreview(URL.createObjectURL(file));
                          }
                        })}
                      />
                    </label>
                  )}
                  {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail.message}</p>}
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
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