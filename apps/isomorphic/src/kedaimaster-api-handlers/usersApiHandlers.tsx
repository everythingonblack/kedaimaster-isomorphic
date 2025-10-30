// apps/isomorphic/src/kedaimaster-api-handlers/usersApiHandlers.tsx

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} from '@/kedaimaster-api/usersApi';

export type User = {
  id: string;
  email: string;
  role: string;
};

export type CreateUserRequest = {
  email: string;
  password: string;
  role: string;
};

export type UpdateUserRequest = {
  email: string;
  role: string;
};

export type UpdateUserPasswordRequest = {
  newPassword: string;
  confPassword: string;
};

const usersApiHandlers = {
  async getAll(): Promise<User[]> {
    try {
      const res = await getAllUsers();
      return res as User[];
    } catch (error: any) {
      console.error('❌ Failed to get all users:', error?.message || error);
      throw new Error('Failed to fetch users');
    }
  },

  async getById(id: string): Promise<User> {
    try {
      const res = await getUserById(id);
      return res as User;
    } catch (error: any) {
      console.error('❌ Failed to get user by ID:', error?.message || error);
      throw new Error('Failed to fetch user by ID');
    }
  },

  async create(userData: CreateUserRequest): Promise<User> {
    try {
      const { email, password, role } = userData;
      console.log('📦 Sending create payload:', { email, password, role });
      const res = await createUser(email, password, role);
      return res as User;
    } catch (error: any) {
      console.error('❌ Failed to create user:', error?.message || error);
      throw new Error('Failed to create user');
    }
  },

  async update(id: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const { email, role } = userData;
      console.log('📦 Sending update payload:', { id, email, role });
      const res = await updateUser(id, email, role);
      return res as User;
    } catch (error: any) {
      console.error('❌ Failed to update user:', error?.message || error);
      throw new Error('Failed to update user');
    }
  },

  async updatePassword(id: string, passwordData: UpdateUserPasswordRequest): Promise<void> {
    try {
      const { newPassword, confPassword } = passwordData;
      console.log('📦 Updating password:', { id, newPassword, confPassword });
      await updateUserPassword(id, newPassword, confPassword);
    } catch (error: any) {
      console.error('❌ Failed to update user password:', error?.message || error);
      throw new Error('Failed to update password');
    }
  },

  async delete(id: string): Promise<void> {
    try {
      console.log('🗑️ Deleting user:', id);
      await deleteUser(id);
    } catch (error: any) {
      console.error('❌ Failed to delete user:', error?.response || error);
      throw new Error('Failed to delete user');
    }
  },
};

export default usersApiHandlers;
