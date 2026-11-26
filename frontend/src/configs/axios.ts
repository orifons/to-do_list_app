import axios from "axios"

import { API_URLS } from "@/configs/api-urls"

function isPublicAuthRequest(url?: string) {
  return url === API_URLS.auth.signIn || url === API_URLS.auth.register
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem("auth-store")
    const accessToken = storedAuth && !isPublicAuthRequest(config.url)
      ? JSON.parse(storedAuth).state.tokens?.access
      : null

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !isPublicAuthRequest(error.config?.url)
    ) {
      localStorage.removeItem("auth-store")
      window.location.href = "/sign-in"
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
