import { getTokens as fetchTokens, clearTokens as removeTokens } from "@/kedaimaster-api/authApi";

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
    const profile = await getProfile();
    return profile ? true : false;
  } catch {
    clearTokens();
    return false;
  }
};