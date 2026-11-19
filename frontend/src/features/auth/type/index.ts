export type Avatar = {
  image: string;
}

export type User = {
  id: number;
  avatar: Avatar;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
}

const tokens = {
  access: "",
  refresh: "",
};

export const initialState = {
  isAuthenticated: false,
  tokens: tokens,
  user: null as User | null,
};

export type AuthState = typeof initialState & {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTokens: (tokens: { access: string; refresh: string }) => void;
  setUser: (user: User | null) => void;
  signIn: (user: User | null, tokens: { access: string; refresh: string }) => void;
  signOut: () => void;
};

export type SignInResponse = {
  access: string;
  refresh: string;
  user: User;
};

export type SignInRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email?: string;
  password: string;
  confirmPassword: string;
};