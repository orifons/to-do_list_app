import type { AxiosResponse } from "axios";

import axiosInstance from "@/configs/axios";
import { API_URLS } from "@/configs/api-urls";
import type { RegisterRequest, SignInRequest, SignInResponse } from "@/features/auth/type";

export const authService = {
  signIn: async (data: SignInRequest): Promise<AxiosResponse<SignInResponse>> => {
    const response = await axiosInstance.post<SignInResponse>(API_URLS.auth.signIn, data);
    return response;
  },

  signOut: async () => {
    // TODO: Implement logout logic here
  },

  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post(API_URLS.auth.register, data);
    return response;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get(API_URLS.auth.getCurrentUser);
    return response;
  },
};