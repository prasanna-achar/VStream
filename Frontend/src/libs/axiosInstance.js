import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
    baseURL: config.backend_url,
    withCredentials: true
})

// Add request interceptor to include Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;