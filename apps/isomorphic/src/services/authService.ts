import { getTokens as fetchTokens, clearTokens as removeTokens } from "@/kedaimaster-api/authApi";
import authApiHandlers from "@/kedaimaster-api-handlers/authApiHandlers";

export const getTokens = () => {
  return fetchTokens();
};

export const clearTokens = () => {
  removeTokens();
};

export const isAuthenticated = async () => {
  const { accessToken } = getTokens();
  if (!accessToken) return false;

  try {
    const profile = await authApiHandlers.getProfileData();
    return profile ? true : false;
  } catch {
    clearTokens();
    return false;
  }
};