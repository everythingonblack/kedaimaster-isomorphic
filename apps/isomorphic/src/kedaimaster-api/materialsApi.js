import { apiRequest } from './authApi.js';

// ===========================================
// Material API
// ===========================================

/**
 * GET: Ambil semua material
 */
export async function getAllMaterials() {
  return apiRequest('/api/v1/materials', 'GET');
}

/**
 * GET: Ambil detail material berdasarkan ID
 * @param {string} id
 */
export async function getMaterialById(id) {
  if (!id) throw new Error('Material ID is required');
  return apiRequest(`/api/v1/materials/${id}`, 'GET');
}

/**
 * PUT: Update material berdasarkan ID
 * @param {string} id
 * @param {Object} data - { name, remarks, uomId }
 */
export async function updateMaterial(id, data) {
  if (!id || !data) throw new Error('Material ID and data are required');
  return apiRequest(`/api/v1/materials/${id}`, 'PUT', data);
}

/**
 * DELETE: Hapus material berdasarkan ID
 * @param {string} id
 */
export async function deleteMaterial(id) {
  if (!id) throw new Error('Material ID is required');
  return apiRequest(`/api/v1/materials/${id}`, 'DELETE');
}

/**
 * PUT: Tambahkan stok material (stock in)
 * @param {string} id
 * @param {number} qty
 * @param {number} unitPrice
 */
export async function stockInMaterial(id, qty, unitPrice) {
  if (!id || qty == null || unitPrice == null)
    throw new Error('Material ID, qty, and unitPrice are required');
  return apiRequest(`/api/v1/materials/${id}/stockIn`, 'PUT', { qty, unitPrice });
}

/**
 * PUT: Kurangi stok material (stock out)
 * @param {string} id
 * @param {number} qty
 */
export async function stockOutMaterial(id, qty) {
  if (!id || qty == null) throw new Error('Material ID and qty are required');
  return apiRequest(`/api/v1/materials/${id}/stockOut`, 'PUT', { qty });
}
