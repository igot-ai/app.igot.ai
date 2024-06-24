import { create } from "zustand";

interface AuthProperties {
  isLoggedIn: boolean;
}

interface AuthStore extends AuthProperties {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const DEFAULT_AUTH_STATE: AuthProperties = {
  isLoggedIn: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...DEFAULT_AUTH_STATE,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));