// apps/isomorphic/src/kedaimaster-api-handlers/usersApiHandlers.tsx

import { getAllUsers, getUserById, createUser, updateUser, updateUserPassword, deleteUser } from '@/kedaimaster-api/usersApi';

// Define the types based on the usersApi.js
export type User = { id: string; email: string; role: string; };
export type CreateUserRequest = { email: string; password: string; role: string; };
export type UpdateUserRequest = { email: string; role: string; };
export type UpdateUserPasswordRequest = { newPassword: string; confPassword: string; };

const usersApiHandlers = {
  async getAll(): Promise<User[]> {
    try {
      return await getAllUsers() as User[];
    } catch (error) {
      console.error("Failed to get all users:", error);
      throw error;
    }
  },
  async getById(id: string): Promise<User> {
    try {
      const response = await getUserById(id);
      return response as User;
    } catch (error) {
      console.error("Failed to get user by id:", error);
      throw error;
    }
  },
  async create(userData: CreateUserRequest): Promise<User> {
    try {
      const { email, password, role } = userData;
      return await createUser(email, password, role) as User;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  },
  async update(id: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const { email, role } = userData;
      return await updateUser(id, email, role) as User;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  },
  async updatePassword(id: string, passwordData: UpdateUserPasswordRequest): Promise<void> {
    try {
      const { newPassword, confPassword } = passwordData;
      await updateUserPassword(id, newPassword, confPassword);
    } catch (error) {
      console.error("Failed to update user password:", error);
      throw error;
    }
  },
  async delete(id: string): Promise<void> {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  },
};

export default usersApiHandlers;