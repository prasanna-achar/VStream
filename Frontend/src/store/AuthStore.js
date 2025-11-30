import { create } from "zustand";
import axiosInstance from "../libs/axiosInstance";
import toast from "react-hot-toast";

const authStore = create((set, state) => ({
    AuthUser: null,
    isLoading: false,
    isCheckingAuth: true,
    verificationCode: null,
    login: async (data) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post("/auth/login", data)
            if (response.status >= 300) {
                throw new Error(response.data.message || response.data.error);
            }
            const token = response.data.data?.token || response.data.token;

            set((state) => ({
                verificationCode: token
            }))
            return token;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Login failed";
            toast.error(errorMessage);
            throw error;
        }
        finally {
            set({ isLoading: false })
        }
    },
    register: async (data) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post("/auth/register", data)
            if (response.status >= 300) {
                throw new Error(response.data.message || response.data.error);
            }
            const token = response.data.data?.token || response.data.token;
            set((state) => ({
                verificationCode: token
            }))
            return token;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Registration failed";
            toast.error(errorMessage);
            throw error;
        }
        finally {
            set({ isLoading: false })
        }
    },
    verify: async (data, token) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post(`/auth/verify/${token}`, { OTP: data.otp || data.OTP })
            if (response.status >= 300) {
                throw new Error(response.data.message || response.data.error);
            }

            set((state) => ({
                AuthUser: response.data.data || response.data
            }))
            toast.success(response.data.message || "Verification successful");
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Verification failed";
            toast.error(errorMessage);
            throw error;
        }
        finally {
            set({ isLoading: false })
        }
    },
    forgotPassword: async (data) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post("/auth/forgot-password", data)
            if (response.status >= 300) {
                throw new Error(response.data.message || response.data.error);
            }
            toast.success(response.data.message || "Reset link sent to your email");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to send reset link";
            toast.error(errorMessage);
            throw error;
        }
        finally {
            set({ isLoading: false })
        }
    },
    resendOtp: async (token) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post(`/auth/resend-otp/${token}`)
            if (response.status >= 300) {
                throw new Error(response.data.data.message || response.data.data.error);
            }
            toast.success(response.data?.data?.message || "OTP sent again");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to resend OTP";
            toast.error(errorMessage);
            throw error;
        }
        finally {
            set({ isLoading: false })
        }
    },
    getme: async () => {
        set({ isCheckingAuth: true })
        try {

            const response = await axiosInstance.get("/auth/me")
            if (response.status >= 300) {
                throw new Error(response.data.data.message || response.data.error);
            }
            set({
                AuthUser: response.data.data || response.data
            })
            return response.data.data || response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to get user info";
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                set({ AuthUser: null });
            }
            throw error;
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    resetPassword: async (data, token) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post(`/auth/reset-password/${token}`, data)
            if (response.status >= 300) {
                throw new Error(response.data.data.message || response.data.data.error);
            }
            toast.success(response.data.message || "Password reset successful");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to reset password";
            toast.error(errorMessage);
            throw error;
        }
        finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        set({ isLoading: true });
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("token");
            set({
                AuthUser: null,
                verificationCode: null
            });
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout failed:", error);
            // Force logout on client even if server fails
            localStorage.removeItem("token");
            set({
                AuthUser: null,
                verificationCode: null
            });
        } finally {
            set({ isLoading: false });
        }
    }
}))


export default authStore;
