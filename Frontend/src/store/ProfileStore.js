import { create } from "zustand";
import axiosInstance from "../libs/axiosInstance";
import toast from "react-hot-toast";
const useProfileStore = create((set) => ({
    profile: {},
    isLoading: false,
    userProfile: {},

    saveProfile: async (data) => {
        set({ isLoading: true })
        try {

            const res = await axiosInstance.post("/profile/save", data);
            if (res.data.status >= 300) {
                throw new Error("error occured in saving profile");
            }
            set({ profile: res.data.data })
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        } finally {
            set({ isLoading: false })
        }
    },

    getProfile: async () => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.get("/profile");
            if (res.data.status >= 300) {
                throw new Error("error occured in getting profile");
            }
            set({ profile: res.data.data })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },

    uploadAvatar: async (formData) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.post("/profile/upload-avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res.data.status >= 300) {
                throw new Error("error occured in uploading avatar");
            }
            set({ profile: res.data.data })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },
    getUserProfile: async (userId) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.get(`/profile/${userId}`);
            if (res.data.status >= 300) {
                throw new Error("error occured in getting user profile");
            }
            set({ userProfile: res.data.data })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    }


}))

export default useProfileStore