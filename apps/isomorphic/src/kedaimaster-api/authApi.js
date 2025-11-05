// src/utils/authApi.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dev-api-v2.kedaimaster.com';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Ambil token dari localStorage
 */
export function getTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
}

/**
 * Simpan token baru ke localStorage
 */
function saveTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * Hapus token (misalnya saat logout)
 */
export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Fungsi utama pemanggil API
 */
export async function apiRequest(endpoint, method = 'POST', data = {}, retry = true) {
  const { accessToken } = getTokens();

  try {
    const headers = {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    // Hanya set Content-Type jika bukan FormData
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const options = {
      method,
      headers,
    };

    // Kirim body sesuai tipe
    if (method !== 'GET' && method !== 'HEAD') {
      options.body = isFormData ? data : JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json().catch(() => ({}));

    if (response.ok) return result;

    // Token expired → refresh otomatis
    if (retry && (response.status === 401 || response.status === 403)) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        return apiRequest(endpoint, method, data, false); // ulang sekali saja
      }
    }

    const err = {
      status: response.status,
      message: result.message || 'API Error',
      description: result.description || '',
      errorMessages: result.errorMessages || {},
    };
    throw err;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * Coba refresh token
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses (refresh token berhasil):
 * {
 *   "accessToken": "string",
 *   "refreshToken": "string"
 * }
 */
async function tryRefreshToken() {
  const { refreshToken } = getTokens();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/refreshToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return false;
    }

    const result = await response.json();
    saveTokens(result); // pastikan API kirim accessToken dan refreshToken
    return true;
  } catch (err) {
    console.error('Token refresh failed:', err);
    clearTokens();
    return false;
  }
}

/**
 * API publik
 */

/**
 * Register user baru
 *
 * @param {Object} data - Data registrasi
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.passwordConfirm
 * @param {string} data.role
 *
 * ✅ RESPONSE 201 Created
 * {
 *   "id": "string",
 *   "email": "string",
 *   "role": "Sistem Administrator",
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:06:15.655Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:06:15.655Z"
 * }
 */
export async function registerUser({ email, password, passwordConfirm, role }) {
  return apiRequest('/register', 'POST', { email, password, passwordConfirm, role });
}

/**
 * Autentikasi pengguna (login)
 *
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.password
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses (login berhasil):
 * {
 *   "accessToken": "string",
 *   "refreshToken": "string",
 *   "user": {
 *     "id": "string",
 *     "email": "string",
 *     "role": "Sistem Administrator"
 *   }
 * }
 */
export async function authenticate({ email, password }) {
  const result = await apiRequest('/authenticate', 'POST', { email, password });
  saveTokens(result); // simpan token setelah login
  return result;
}

/**
 * Refresh token secara manual
 *
 * ✅ RESPONSE 200 OK
 * {
 *   "accessToken": "string",
 *   "refreshToken": "string"
 * }
 */
export async function refreshTokenManually() {
  const { refreshToken } = getTokens();
  if (!refreshToken) throw new Error('No refresh token found');
  return apiRequest('/refreshToken', 'POST', { refreshToken });
}

export async function getProfile() {
  // For now, return a mock user profile. In a real app, this would fetch from an API.
  const { accessToken } = getTokens();
  if (!accessToken) {
    return null;
  }

  // Simulate fetching a profile
  return {
    id: 'user-123',
    email: 'user@example.com',
    name: 'John Doe', // Added name for testing
    role: 'user',
  };
}

export function logOut() {
  clearTokens();
  window.location.href = '/';
}
