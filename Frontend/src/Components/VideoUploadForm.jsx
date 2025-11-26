import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import videoUploadSchema from '../TypeSchemas/VideoUploadSchema';
import { useVideoStore } from '../store/VideoStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

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
        toast.error("sorry for some technical issue can't upload video");
        navigate("/");
      });

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen min-h-screen bg-green-100 flex justify-center items-center p-10"
    >
      <div className="bg-white bg-opacity-70 w-full max-w-6xl p-10 rounded-2xl grid lg:grid-cols-2 gap-10">

        {/* LEFT SIDE: Title + Description */}
        <div className="bg-gray-200 p-6 rounded-xl space-y-6 shadow-inner">
          <div className="space-y-2">
            <label className="font-semibold">Video Title:</label>
            <input
              type="text"
              {...register("title")}
              className="w-full p-3 rounded-full border focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter title..."
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-semibold">Video Description:</label>
            <textarea
              {...register("description")}
              className="w-full p-4 rounded-2xl border focus:ring-2 focus:ring-blue-400 outline-none"
              rows={6}
              placeholder="Enter description..."
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>

        {/* RIGHT SIDE: Previews */}
        <div className="bg-gray-200 p-6 rounded-xl space-y-6 shadow-inner">

          {/* Video Preview */}
          <div className="space-y-2 text-center">
            {videoPreview ? (
              <video src={videoPreview} controls className="w-full h-40 rounded-2xl object-cover" />
            ) : (
              <div className="w-full h-40 rounded-2xl bg-white grid place-items-center text-gray-500">
                Video Overview
              </div>
            )}
            <input
              type="file"
              accept="video/*"
              {...register("video")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setVideoPreview(URL.createObjectURL(file));
              }}
              className="w-full text-center p-3 rounded-full bg-white shadow cursor-pointer"
            />
            {errors.video && <p className="text-red-500 text-sm">{errors.video.message}</p>}
          </div>

          {/* Thumbnail Preview */}
          <div className="space-y-2 text-center">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                className="w-full h-40 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-full h-40 rounded-2xl bg-white grid place-items-center text-gray-500">
                Thumbnail Overview
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setThumbnailPreview(URL.createObjectURL(file));
              }}
              className="w-full text-center p-3 rounded-full bg-white shadow cursor-pointer"
            />
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className={`col-span-2 ${isLoading ? "bg-blue-200 " : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-3 rounded-full w-full transition-all shadow-md flex items-center justify-center`}
          disabled={isLoading}
        >
          {!isLoading ? "Upload Video." : <Loader2 className='animate-spin size-5' />}
        </button>
      </div>
    </form>
  );


}

export default VideoUploadForm