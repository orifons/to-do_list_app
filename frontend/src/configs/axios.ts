import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("auth-store")
      ? JSON.parse(localStorage.getItem("auth-store")!).state.tokens?.access
      : null
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access")
      window.location.href = "/sign-in"
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
