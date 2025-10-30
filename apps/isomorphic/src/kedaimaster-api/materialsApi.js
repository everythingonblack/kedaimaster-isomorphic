import { apiRequest } from './authApi.js';

// ===========================================
// MATERIAL API
// ===========================================

/**
 * GET: Ambil semua material
 *
 * @returns {Promise<Array>} Daftar material
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * [
 *   {
 *     "id": "string",
 *     "name": "string",
 *     "remarks": "string",
 *     "uom": {
 *       "id": "string",
 *       "code": "string",
 *       "name": "string",
 *       "imageUrl": "string"
 *     },
 *     "stock": 1073741824,
 *     "createdBy": "string",
 *     "createdOn": "2025-10-23T09:09:53.044Z",
 *     "updatedBy": "string",
 *     "updatedOn": "2025-10-23T09:09:53.044Z"
 *   }
 * ]
 */
export async function getAllMaterials() {
  return apiRequest('/api/v1/materials', 'GET');
}

/**
 * GET: Ambil detail material berdasarkan ID
 *
 * @param {string} id - ID material
 * @returns {Promise<Object>} Detail material
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "remarks": "string",
 *   "uom": {
 *     "id": "string",
 *     "code": "string",
 *     "name": "string",
 *     "imageUrl": "string"
 *   },
 *   "stock": 1073741824,
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:08:55.015Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:08:55.015Z"
 * }
 */
export async function getMaterialById(id) {
  if (!id) throw new Error('Material ID is required');
  return apiRequest(`/api/v1/materials/${id}`, 'GET');
}

/**
 * POST: Tambah material baru
 *
 * @param {Object} data - Data material baru
 * @param {string} data.name - Nama material
 * @param {string} data.remarks - Keterangan tambahan
 * @param {string} data.uomId - ID satuan (Unit of Measure)
 * @returns {Promise<Object>} Material yang baru dibuat
 *
 * ✅ RESPONSE 201 Created
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "remarks": "string",
 *   "uom": {
 *     "id": "string",
 *     "code": "string",
 *     "name": "string",
 *     "imageUrl": "string"
 *   },
 *   "stock": 1073741824,
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:10:02.744Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:10:02.744Z"
 * }
 */
export async function createMaterial(data) {
  if (!data) throw new Error('Material data is required');
  return apiRequest('/api/v1/materials', 'POST', data);
}

/**
 * PUT: Update material berdasarkan ID
 *
 * @param {string} id - ID material
 * @param {Object} data - Data yang akan diperbarui
 * @param {string} [data.name]
 * @param {string} [data.remarks]
 * @param {string} [data.uomId]
 * @returns {Promise<Object>} Material yang diperbarui
 *
 * ✅ RESPONSE 202 Accepted
 * Contoh respons sukses:
 * {
 *   "id": "string",
 *   "name": "string",
 *   "remarks": "string",
 *   "uom": {
 *     "id": "string",
 *     "code": "string",
 *     "name": "string",
 *     "imageUrl": "string"
 *   },
 *   "stock": 1073741824,
 *   "createdBy": "string",
 *   "createdOn": "2025-10-23T09:09:09.989Z",
 *   "updatedBy": "string",
 *   "updatedOn": "2025-10-23T09:09:09.989Z"
 * }
 */
export async function updateMaterial(id, data, imageFile) {
  if (!id || !data) throw new Error('Material ID and data are required');
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return apiRequest(`/api/v1/materials/${id}`, 'PUT', formData, true); // true for multipart/form-data
}

/**
 * DELETE: Hapus material berdasarkan ID
 *
 * @param {string} id - ID material
 * @returns {Promise<Object>} Respons kosong
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * {}
 */
export async function deleteMaterial(id) {
  if (!id) throw new Error('Material ID is required');
  return apiRequest(`/api/v1/materials/${id}`, 'DELETE');
}

/**
 * PUT: Tambahkan stok material (stock in)
 *
 * @param {string} id - ID material
 * @param {number} qty - Jumlah stok yang masuk
 * @param {number} unitPrice - Harga per unit
 * @returns {Promise<Object>} Respons kosong
 *
 * ✅ RESPONSE 202 Accepted
 * Contoh respons sukses:
 * {}
 */
export async function stockInMaterial(id, qty, unitPrice) {
  if (!id || qty == null || unitPrice == null)
    throw new Error('Material ID, qty, and unitPrice are required');
  return apiRequest(`/api/v1/materials/${id}/stockIn`, 'PUT', { qty, unitPrice });
}

/**
 * PUT: Kurangi stok material (stock out)
 *
 * @param {string} id - ID material
 * @param {number} qty - Jumlah stok yang keluar
 * @returns {Promise<Object>} Respons kosong
 *
 * ✅ RESPONSE 202 Accepted
 * Contoh respons sukses:
 * {}
 */
export async function stockOutMaterial(id, qty) {
  if (!id || qty == null) throw new Error('Material ID and qty are required');
  return apiRequest(`/api/v1/materials/${id}/stockOut`, 'PUT', { qty });
}
