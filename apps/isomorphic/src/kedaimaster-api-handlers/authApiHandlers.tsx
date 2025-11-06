// apps/isomorphic/src/kedaimaster-api-handlers/authApiHandlers.tsx

import { registerUser, authenticate, refreshTokenManually, getProfile } from '@/kedaimaster-api/authApi';

// Define the types based on the authApi.js
export type RegisterUserRequest = { email: string; password: string; passwordConfirm: string; role: string; };
export type RegisterUserResponse = { id: string; email: string; role: string; createdBy: string; createdOn: string; updatedBy: string; updatedOn: string; };
export type AuthenticateRequest = { email: string; password: string; };
export type AuthenticateResponse = { accessToken: string; refreshToken: string; user: { id: string; email: string; role: string; }; };
export type RefreshTokenResponse = { accessToken: string; refreshToken: string; };
export type Profile = { id: string; email: string; name?: string; role: string; };

const authApiHandlers = {
  async register(data: RegisterUserRequest): Promise<RegisterUserResponse> {
    try {
      return await registerUser(data);
    } catch (error) {
      console.error("Failed to register user:", error);
      throw error;
    }
  },
  async authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    try {
      return await authenticate(data);
    } catch (error) {
      console.error("Failed to authenticate:", error);
      throw error;
    }
  },
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      return await refreshTokenManually();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  },
  async getProfileData(): Promise<Profile | null> {
    try {
      return await getProfile();
    } catch (error) {
      console.error("Failed to get profile:", error);
      return null;
    }
  },
};

export default authApiHandlers;