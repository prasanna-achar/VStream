// src/store/videoStore.js
import { create } from "zustand";
import axiosInstance from "../libs/axiosInstance";
import toast from "react-hot-toast";
export const useVideoStore = create((set) => ({
  videos: [],
  currentVideo: null,
  isLoading: false,
  error: null,

  // ➤ Get all videos
  fetchVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/video");
      set({ videos: res.data.data || [] });
    } catch (error) {
      set({ error: error.response?.data || "Failed to fetch videos" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ➤ Get single video by token
  fetchVideoByToken: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/video/get-by-token/${token}`);
      set({ currentVideo: res.data.data });
    } catch (error) {
      set({ error: "Video not found" });
    } finally {
      set({ isLoading: false });
    }
  },
  getMyVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/video/my-video");
      set({ videos: res.data.data || [] });
    } catch (error) {
      set({ error: error.response?.data || "Failed to fetch videos" });
    } finally {
      set({ isLoading: false });
    }

  },


  // ➤ Upload video (Multipart form)
  uploadVideo: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/video/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      set({ error: "Video upload failed" });
      toast.error(error.data.message || "Video failed to upload")
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
