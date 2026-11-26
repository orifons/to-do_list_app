import { create } from "zustand";
import { persist } from "zustand/middleware";

import { initialState, type AuthState, type User } from "@/features/auth/type";

const authStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setTokens: (tokens: { access: string; refresh: string }) => set({ tokens }),
      setUser: (user: User | null) => set({ user }),
      signIn: (user: User | null, tokens: { access: string; refresh: string }) => {
        set({
          user: user, tokens: tokens, isAuthenticated: true
        })
      },
      signOut: () => set(initialState),
    }),
    { name: "auth-store" },
  ),
);

export default authStore;