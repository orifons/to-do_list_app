import axios, { type AxiosResponse } from "axios";

import axiosInstance from "@/configs/axios";
import { API_URLS } from "@/configs/api-urls";
import type { RegisterRequest, SignInRequest, SignInResponse } from "@/features/auth/type";

const URL_BASE: string = import.meta.env.VITE_API_BASE_URL

export const authService = {
  signIn: async (data: SignInRequest): Promise<AxiosResponse<SignInResponse>> => {
    const SINGIN_URL: string = `${URL_BASE}/${API_URLS.auth.signIn}`
    const response = await axios.post<SignInResponse>(SINGIN_URL, data);
    return response;
  },

  signOut: async () => {
    // TODO: Implement logout logic here
  },

  register: async (data: RegisterRequest) => {
    const response = await axios.post(API_URLS.auth.register, data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get(API_URLS.auth.getCurrentUser);
    return response.data;
  },
};