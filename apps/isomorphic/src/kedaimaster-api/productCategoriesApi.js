import { apiRequest } from './authApi.js';

// ===========================================
// PRODUCT CATEGORY API
// ===========================================

/**
 * GET: Ambil semua kategori produk
 *
 * @returns {Promise<Array>} Daftar kategori produk
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * [
 *   {
 *     "id": "string",
 *     "name": "string",
 *     "imageUrl": "string",
 *     "createdBy": "string",
 *     "createdOn": "2025-10-23T09:11:51.686Z",
 *     "updatedBy": "string",
 *     "updatedOn": "2025-10-23T09:11:51.686Z"
 *   }
 * ]
 */
export async function getAllProductCategories() {
  return apiRequest('/api/v1/productCategories', 'GET');
}

/**
 * GET: Ambil detail kategori produk berdasarkan ID
 *
 * @param {string} id - ID kategori produk
 * @returns {Promise<Object>} Detail kategori produk
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "imageUrl": "string",
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:11:18.985Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:11:18.985Z"
 * }
 */
export async function getProductCategoryById(id) {
  if (!id) throw new Error('Product Category ID is required');
  return apiRequest(`/api/v1/productCategories/${id}`, 'GET');
}

/**
 * POST: Buat kategori produk baru (dengan multipart/form-data)
 *
 * @param {Object} data - Data kategori produk
 * @param {string} data.name - Nama kategori produk
 * @param {File|Blob} [data.image] - Gambar kategori (opsional)
 * @returns {Promise<Object>} Kategori produk baru
 *
 * ✅ RESPONSE 201 Created
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "imageUrl": "string",
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:12:00.215Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:12:00.215Z"
 * }
 */
export async function createProductCategory(data) {
  if (!data?.name) throw new Error('Category name is required');
  
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.image) formData.append('image', data.image);

  return apiRequest('/api/v1/productCategories', 'POST', formData, {
    'Content-Type': 'multipart/form-data',
  });
}

/**
 * PUT: Update kategori produk berdasarkan ID (dengan multipart/form-data)
 *
 * @param {string} id - ID kategori produk
 * @param {Object} data - Data pembaruan
 * @param {string} data.name - Nama kategori
 * @param {File|Blob} [data.image] - Gambar baru (opsional)
 * @returns {Promise<Object>} Kategori yang diperbarui
 *
 * ✅ RESPONSE 202 Accepted
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "imageUrl": "string",
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:11:31.192Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:11:31.192Z"
 * }
 */
export async function updateProductCategory(id, data) {
  if (!id || !data?.name) throw new Error('ID dan nama kategori dibutuhkan');

  const formData = new FormData();
  formData.append('name', data.name);
  if (data.image) formData.append('image', data.image);

  return apiRequest(`/api/v1/productCategories/${id}`, 'PUT', formData, {
    'Content-Type': 'multipart/form-data',
  });
}

/**
 * DELETE: Hapus kategori produk berdasarkan ID
 *
 * @param {string} id - ID kategori produk
 * @returns {Promise<Object>} Respons kosong
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * {}
 */
export async function deleteProductCategory(id) {
  if (!id) throw new Error('Product Category ID is required');
  return apiRequest(`/api/v1/productCategories/${id}`, 'DELETE');
}

/**
 * GET: Ambil semua produk dari kategori tertentu
 *
 * @param {string} id - ID kategori produk
 * @returns {Promise<Array>} Daftar produk dari kategori tersebut
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * [
 *   {
 *     "id": "string",
 *     "name": "string",
 *     "imageUrl": "string",
 *     "category": {
 *       "id": "string",
 *       "code": "string",
 *       "name": "string",
 *       "imageUrl": "string"
 *     },
 *     "price": {
 *       "id": "string",
 *       "effectiveDate": "2025-10-23T09:12:12.109Z",
 *       "unitPrice": 0,
 *       "active": true,
 *       "createdBy": "string",
 *       "createdOn": "2025-10-23T09:12:12.109Z",
 *       "updatedBy": "string",
 *       "updatedOn": "2025-10-23T09:12:12.109Z"
 *     },
 *     "stocking": true,
 *     "stock": 1073741824,
 *     "createdBy": "string",
 *     "createdOn": "2025-10-23T09:12:12.109Z",
 *     "updatedBy": "string",
 *     "updatedOn": "2025-10-23T09:12:12.109Z"
 *   }
 * ]
 */
export async function getProductsByCategoryId(id) {
  if (!id) throw new Error('Product Category ID is required');
  return apiRequest(`/api/v1/productCategories/${id}/products`, 'GET');
}

/**
 * GET: Ambil daftar kategori produk untuk dropdown (misalnya pada form produk)
 *
 * @returns {Promise<Array>} Daftar kategori (ringkas)
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * [
 *   {
 *     "id": "string",
 *     "code": "string",
 *     "name": "string",
 *     "imageUrl": "string"
 *   }
 * ]
 */
export async function getProductCategoryDropdown() {
  return apiRequest('/api/v1/productCategories/dropdown', 'GET');
}

/**
 * POST: Ambil data kategori produk versi DataTables
 *
 * @param {Object} body - Data filter, paging, atau pencarian
 * @returns {Promise<Object>} Data sesuai format DataTables
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses (umumnya dari backend DataTables):
 * {
 *   "draw": 1,
 *   "recordsTotal": 100,
 *   "recordsFiltered": 100,
 *   "data": [ ... ]
 * }
 */
export async function getProductCategoryDatatable(body = {}) {
  return apiRequest('/api/v1/dt-productCategories', 'POST', body);
}
