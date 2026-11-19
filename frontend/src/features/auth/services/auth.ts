import { API_URLS } from "@/configs/api-urls";
import axiosInstance from "@/configs/axios";

import type { RegisterRequest, SignInRequest } from "@/features/auth/type";

export const authService = {
  signIn: async (data: SignInRequest) => {
    const response = await axiosInstance.post(API_URLS.auth.signIn, data);
    console.log("Respuesta del servicio SignIn:", response);

    return response;
  },

  signOut: async () => {
    // TODO: Implement logout logic here
  },

  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post(API_URLS.auth.register, data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get(API_URLS.auth.getCurrentUser);
    return response.data;
  },
};