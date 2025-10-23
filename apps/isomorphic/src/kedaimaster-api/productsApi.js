import { apiRequest } from './authApi.js';

// ===========================================
// PRODUCT API
// ===========================================

/**
 * GET: Ambil daftar semua produk
 */
export async function getAllProducts() {
  return apiRequest('/api/v1/products', 'GET');
}

/**
 * GET: Ambil detail produk berdasarkan ID
 * @param {string} id - ID produk
 */
export async function getProductById(id) {
  return apiRequest(`/api/v1/products/${id}`, 'GET');
}

/**
 * POST: Buat produk baru
 * @param {FormData} formData - FormData berisi name, categoryId, image (file)
 */
export async function createProduct(formData) {
  return apiRequest('/api/v1/products', 'POST', formData, {
    'Content-Type': 'multipart/form-data'
  });
}

/**
 * PUT: Update data produk berdasarkan ID
 * @param {string} id - ID produk
 * @param {FormData} formData - FormData berisi name, categoryId, image (file)
 */
export async function updateProduct(id, formData) {
  return apiRequest(`/api/v1/products/${id}`, 'PUT', formData, {
    'Content-Type': 'multipart/form-data'
  });
}

/**
 * DELETE: Hapus produk berdasarkan ID
 * @param {string} id - ID produk
 */
export async function deleteProduct(id) {
  return apiRequest(`/api/v1/products/${id}`, 'DELETE');
}

/**
 * PUT: Update stock produk
 * @param {string} id - ID produk
 * @param {Object} data - Contoh: { type: 'IN' | 'OUT', qty: number }
 */
export async function updateProductStock(id, data) {
  return apiRequest(`/api/v1/products/${id}/stock`, 'PUT', JSON.stringify(data), {
    'Content-Type': 'application/json'
  });
}

/**
 * PUT: Update harga produk
 * @param {string} id - ID produk
 * @param {Object} data - Contoh: { price: number, effectiveDate: string }
 */
export async function updateProductPrice(id, data) {
  return apiRequest(`/api/v1/products/${id}/price`, 'PUT', JSON.stringify(data), {
    'Content-Type': 'application/json'
  });
}

/**
 * GET: Ambil daftar serving types
 */
export async function getServingTypes() {
  return apiRequest('/api/v1/products/servingTypes', 'GET');
}

/**
 * GET: Ambil daftar payment types
 */
export async function getPaymentTypes() {
  return apiRequest('/api/v1/products/paymentTypes', 'GET');
}
