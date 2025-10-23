import { apiRequest } from './authApi.js';

// ===========================================
// PRODUCT API
// ===========================================

/**
 * GET: Ambil daftar semua produk
 *
 * @returns {Promise<Array>} Daftar produk
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
 *       "effectiveDate": "2025-10-23T09:14:08.714Z",
 *       "unitPrice": 0,
 *       "active": true,
 *       "createdBy": "string",
 *       "createdOn": "2025-10-23T09:14:08.714Z",
 *       "updatedBy": "string",
 *       "updatedOn": "2025-10-23T09:14:08.714Z"
 *     },
 *     "stocking": true,
 *     "stock": 1073741824,
 *     "createdBy": "string",
 *     "createdOn": "2025-10-23T09:14:08.714Z",
 *     "updatedBy": "string",
 *     "updatedOn": "2025-10-23T09:14:08.714Z"
 *   }
 * ]
 */
export async function getAllProducts() {
  return apiRequest('/api/v1/products', 'GET');
}

/**
 * GET: Ambil detail produk berdasarkan ID
 *
 * @param {string} id - ID produk
 * @returns {Promise<Object>} Detail produk
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "imageUrl": "string",
 *   "category": {
 *     "id": "string",
 *     "code": "string",
 *     "name": "string",
 *     "imageUrl": "string"
 *   },
 *   "price": {
 *     "id": "string",
 *     "effectiveDate": "2025-10-23T09:13:15.802Z",
 *     "unitPrice": 0,
 *     "active": true
 *   },
 *   "stocking": true,
 *   "stock": 1073741824,
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:13:15.802Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:13:15.802Z"
 * }
 */
export async function getProductById(id) {
  if (!id) throw new Error('Product ID is required');
  return apiRequest(`/api/v1/products/${id}`, 'GET');
}

/**
 * POST: Buat produk baru (multipart/form-data)
 *
 * @param {Object} data - Data produk
 * @param {string} data.name - Nama produk
 * @param {string} data.categoryId - ID kategori produk
 * @param {File|Blob} [data.image] - Gambar produk (opsional)
 * @returns {Promise<Object>} Produk yang berhasil dibuat
 *
 * ✅ RESPONSE 201 Created
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "imageUrl": "string",
 *   "category": { "id": "string", "name": "string" },
 *   "price": { "unitPrice": 0, "effectiveDate": "2025-10-23T09:14:20.495Z" },
 *   "stock": 0
 * }
 */
export async function createProduct(data) {
  if (!data?.name) throw new Error('Product name is required');

  const formData = new FormData();
  formData.append('name', data.name);
  if (data.categoryId) formData.append('categoryId', data.categoryId);
  if (data.image) formData.append('image', data.image);

  return apiRequest('/api/v1/products', 'POST', formData, {
    'Content-Type': 'multipart/form-data',
  });
}

/**
 * PUT: Update data produk berdasarkan ID
 *
 * @param {string} id - ID produk
 * @param {Object} data - Data produk yang akan diperbarui
 * @param {string} data.name - Nama produk
 * @param {string} data.categoryId - ID kategori produk
 * @param {File|Blob} [data.image] - File gambar produk (opsional)
 * @returns {Promise<Object>} Produk yang diperbarui
 *
 * ✅ RESPONSE 202 Accepted
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "imageUrl": "string",
 *   "category": { "id": "string", "name": "string" },
 *   "price": { "unitPrice": 0, "effectiveDate": "2025-10-23T09:13:27.562Z" },
 *   "stock": 0
 * }
 */
export async function updateProduct(id, data) {
  if (!id) throw new Error('Product ID is required');

  const formData = new FormData();
  if (data?.name) formData.append('name', data.name);
  if (data?.categoryId) formData.append('categoryId', data.categoryId);
  if (data?.image) formData.append('image', data.image);

  return apiRequest(`/api/v1/products/${id}`, 'PUT', formData, {
    'Content-Type': 'multipart/form-data',
  });
}

/**
 * DELETE: Hapus produk berdasarkan ID
 *
 * @param {string} id - ID produk
 * @returns {Promise<Object>} Respons kosong {}
 *
 * ✅ RESPONSE 200 OK
 */
export async function deleteProduct(id) {
  if (!id) throw new Error('Product ID is required');
  return apiRequest(`/api/v1/products/${id}`, 'DELETE');
}

/**
 * PUT: Update stok produk (stock in/out)
 *
 * @param {string} id - ID produk
 * @param {Object} data - Data update stok
 * @param {'IN'|'OUT'} data.type - Jenis update (IN atau OUT)
 * @param {number} data.qty - Jumlah stok yang berubah
 * @returns {Promise<Object>} Respons sukses
 *
 * ✅ RESPONSE 202 Accepted
 * Body contoh:
 * {
 *   "type": "IN",
 *   "qty": 10
 * }
 */
export async function updateProductStock(id, data) {
  if (!id) throw new Error('Product ID is required');
  if (!data?.type || data?.qty == null)
    throw new Error('Stock update requires type and qty');

  return apiRequest(`/api/v1/products/${id}/stock`, 'PUT', JSON.stringify(data), {
    'Content-Type': 'application/json',
  });
}

/**
 * PUT: Update harga produk
 *
 * @param {string} id - ID produk
 * @param {Object} data - Data harga baru
 * @param {number} data.price - Harga baru produk
 * @param {string} data.effectiveDate - Tanggal efektif harga (ISO date)
 * @returns {Promise<Object>} Respons sukses
 *
 * ✅ RESPONSE 202 Accepted
 * Body contoh:
 * {
 *   "price": 25000,
 *   "effectiveDate": "2025-10-23T09:13:57.618Z"
 * }
 */
export async function updateProductPrice(id, data) {
  if (!id) throw new Error('Product ID is required');
  if (!data?.price || !data?.effectiveDate)
    throw new Error('Price and effectiveDate are required');

  return apiRequest(`/api/v1/products/${id}/price`, 'PUT', JSON.stringify(data), {
    'Content-Type': 'application/json',
  });
}

/**
 * GET: Ambil daftar serving types
 *
 * @returns {Promise<Array<string>>} Daftar serving type
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * ["PICKUP", "DINE_IN", "DELIVERY"]
 */
export async function getServingTypes() {
  return apiRequest('/api/v1/products/servingTypes', 'GET');
}

/**
 * GET: Ambil daftar payment types
 *
 * @returns {Promise<Array<string>>} Daftar payment type
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * ["CASH", "QRIS", "CARD"]
 */
export async function getPaymentTypes() {
  return apiRequest('/api/v1/products/paymentTypes', 'GET');
}
