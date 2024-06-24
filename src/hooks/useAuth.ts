import { AUTH_API } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const { push } = useRouter();

  const login = useMutation({
    mutationKey: [AUTH_API.login.name],
    mutationFn: AUTH_API.login,
  });

  const getTokenFromOTP = useMutation({
    mutationKey: [AUTH_API.getTokenFromOTP.name],
    mutationFn: AUTH_API.getTokenFromOTP,
  });

  const loginWithGoogle = () =>
    push(process.env.EXPO_PUBLIC_GOOGLE_OAUTH_URL as string);

  const loginWithGitHub = () =>
    push(process.env.EXPO_PUBLIC_GITHUB_OAUTH_URL as string);

  return {
    login,
    loginWithGoogle,
    loginWithGitHub,
    getTokenFromOTP,
  };
};
