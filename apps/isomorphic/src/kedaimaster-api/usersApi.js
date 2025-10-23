import { apiRequest } from './authApi.js';

// ===========================================
// User API
// ===========================================

/**
 * GET: Ambil semua user
 */
export async function getAllUsers() {
  return apiRequest('/api/v1/users', 'GET');
}

/**
 * GET: Ambil detail user berdasarkan ID
 * @param {string} id
 */
export async function getUserById(id) {
  if (!id) throw new Error('User ID is required');
  return apiRequest(`/api/v1/users/${id}`, 'GET');
}

/**
 * POST: Buat user baru
 * @param {string} email
 * @param {string} password
 * @param {string} role
 */
export async function createUser(email, password, role) {
  if (!email || !password || !role) throw new Error('Email, password, and role are required');
  return apiRequest('/api/v1/users', 'POST', { email, password, role });
}

/**
 * PUT: Update user berdasarkan ID (email dan role)
 * @param {string} id
 * @param {string} email
 * @param {string} role
 */
export async function updateUser(id, email, role) {
  if (!id || !email || !role) throw new Error('User ID, email, and role are required');
  return apiRequest(`/api/v1/users/${id}`, 'PUT', { email, role });
}

/**
 * PUT: Update password user berdasarkan ID
 * @param {string} id
 * @param {string} newPassword
 * @param {string} confPassword
 */
export async function updateUserPassword(id, newPassword, confPassword) {
  if (!id || !newPassword || !confPassword) throw new Error('User ID, newPassword, and confPassword are required');
  return apiRequest(`/api/v1/users/password/${id}`, 'PUT', { newPassword, confPassword });
}

/**
 * DELETE: Hapus user berdasarkan ID
 * @param {string} id
 */
export async function deleteUser(id) {
  if (!id) throw new Error('User ID is required');
  return apiRequest(`/api/v1/users/${id}`, 'DELETE');
}
