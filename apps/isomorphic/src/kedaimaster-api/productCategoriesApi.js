import { apiRequest } from './authApi.js';

// ===========================================
// PRODUCT CATEGORY API
// ===========================================

/**
 * GET: Ambil semua kategori produk
 */
export async function getAllProductCategories() {
  return apiRequest('/api/v1/productCategories', 'GET');
}

/**
 * GET: Ambil detail kategori produk berdasarkan ID
 * @param {string} id
 */
export async function getProductCategoryById(id) {
  if (!id) throw new Error('Product Category ID is required');
  return apiRequest(`/api/v1/productCategories/${id}`, 'GET');
}

/**
 * POST: Buat kategori produk baru (dengan multipart/form-data)
 * @param {Object} data - { name, image (File | Blob) }
 */
export async function createProductCategory(data) {
  if (!data?.name) throw new Error('Category name is required');
  
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.image) formData.append('image', data.image); // opsional

  return apiRequest('/api/v1/productCategories', 'POST', formData, {
    'Content-Type': 'multipart/form-data',
  });
}

/**
 * PUT: Update kategori produk berdasarkan ID (dengan multipart/form-data)
 * @param {string} id
 * @param {Object} data - { name, image (File | Blob) }
 */
export async function updateProductCategory(id, data) {
  if (!id || !data?.name) throw new Error('ID dan nama kategori dibutuhkan');

  const formData = new FormData();
  formData.append('name', data.name);
  if (data.image) formData.append('image', data.image); // opsional

  return apiRequest(`/api/v1/productCategories/${id}`, 'PUT', formData, {
    'Content-Type': 'multipart/form-data',
  });
}

/**
 * DELETE: Hapus kategori produk berdasarkan ID
 * @param {string} id
 */
export async function deleteProductCategory(id) {
  if (!id) throw new Error('Product Category ID is required');
  return apiRequest(`/api/v1/productCategories/${id}`, 'DELETE');
}

/**
 * GET: Ambil semua produk dari kategori tertentu
 * @param {string} id
 */
export async function getProductsByCategoryId(id) {
  if (!id) throw new Error('Product Category ID is required');
  return apiRequest(`/api/v1/productCategories/${id}/products`, 'GET');
}

/**
 * GET: Ambil daftar kategori produk untuk dropdown
 */
export async function getProductCategoryDropdown() {
  return apiRequest('/api/v1/productCategories/dropdown', 'GET');
}

/**
 * POST: Ambil data kategori produk versi DataTables
 * @param {Object} body - Data untuk filter/paging
 */
export async function getProductCategoryDatatable(body = {}) {
  return apiRequest('/api/v1/dt-productCategories', 'POST', body);
}
