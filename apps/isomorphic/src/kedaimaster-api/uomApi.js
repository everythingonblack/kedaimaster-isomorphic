import { apiRequest } from './authApi.js';

// ===========================================
// UOM API
// ===========================================

/**
 * GET: Ambil semua UOM
 */
export async function getAllUoms() {
  return apiRequest('/api/v1/uoms', 'GET');
}

/**
 * GET: Ambil UOM berdasarkan ID
 * @param {string} id - ID UOM
 */
export async function getUomById(id) {
  if (!id) throw new Error('UOM ID is required');
  return apiRequest(`/api/v1/uoms/${id}`, 'GET');
}

/**
 * POST: Buat UOM baru
 * @param {Object} uomData
 * @param {string} uomData.name - Nama UOM
 * @param {string} [uomData.remarks] - Catatan (optional)
 */
export async function createUom(uomData) {
  if (!uomData) throw new Error('UOM data is required');
  return apiRequest('/api/v1/uoms', 'POST', uomData);
}

/**
 * PUT: Update UOM berdasarkan ID
 * @param {string} id - ID UOM
 * @param {Object} uomData
 * @param {string} uomData.name - Nama UOM
 * @param {string} [uomData.remarks] - Catatan (optional)
 */
export async function updateUom(id, uomData) {
  if (!id) throw new Error('UOM ID is required');
  if (!uomData) throw new Error('UOM data is required');
  return apiRequest(`/api/v1/uoms/${id}`, 'PUT', uomData);
}

/**
 * DELETE: Hapus UOM berdasarkan ID
 * @param {string} id - ID UOM
 */
export async function deleteUom(id) {
  if (!id) throw new Error('UOM ID is required');
  return apiRequest(`/api/v1/uoms/${id}`, 'DELETE');
}

/**
 * GET: Ambil dropdown list UOM (id, code, name, imageUrl)
 */
export async function getUomDropdown() {
  return apiRequest('/api/v1/uoms/dropdown', 'GET');
}
