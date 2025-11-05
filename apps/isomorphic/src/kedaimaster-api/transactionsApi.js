import { apiRequest } from './authApi.js';

// ===========================================
// Transaction API
// ===========================================

/**
 * POST: Buat transaksi baru
 * @param {Object} transactionData - Data transaksi
 * @param {string} transactionData.deviceTime - Waktu device, ISO string
 * @param {string} transactionData.paymentType - Tipe pembayaran (e.g. "CASH")
 * @param {string} transactionData.servingType - Tipe layanan (e.g. "PICKUP")
 * @param {string} [transactionData.notes] - Catatan
 * @param {string} [transactionData.customerName] - Nama customer
 * @param {string} [transactionData.customerPhone] - Telepon customer
 * @param {Array} transactionData.items - Daftar item transaksi, setiap item berisi productId, qty, unitPrice
 * @returns {Promise<Object>} Respons dari server
 * 
 * Contoh respons (201 Created):
 * {
 *   "id": "9ab3c211-5371-4a69-8204-83c375833d80",
 *   "refNo": "482243d3-1474-4e71-83fc-9c2816d87ba2",
 *   "paymentType": "CASH",
 *   "servingType": "PICKUP",
 *   "paid": true,
 *   "notes": "tanpa es",
 *   "total": 240000,
 *   "transactionDetails": [
 *     {
 *       "product": {
 *         "id": "a41eb8fa-85f8-4855-9620-ba91736722ba",
 *         "name": "Mie Godog",
 *         "imageUrl": "https://sixro-gun.sgp1.cdn.digitaloceanspaces.com/kedaimaster/miegato_11zon.png"
 *       },
 *       "qty": 20,
 *       "unitPrice": 12000,
 *       "amount": 240000
 *     }
 *   ],
 *   "createdBy": "pasaardianputra@gamil.com",
 *   "createdOn": "2025-10-29T16:39:53",
 *   "updatedBy": "pasaardianputra@gamil.com",
 *   "updatedOn": "2025-10-29T16:39:53"
 * }
 */
export async function createTransaction(transactionData) {
  if (!transactionData) throw new Error('Transaction data is required');
  return apiRequest('/api/v1/transactions', 'POST', transactionData);
}

/**
 * GET: Ambil transaksi berdasarkan ID
 * @param {string} id - ID transaksi
 * @returns {Promise<Object>} Respons dari server
 * 
 * Contoh respons (200 OK):
 * {
 *   "id": "9ab3c211-5371-4a69-8204-83c375833d80",
 *   "refNo": "482243d3-1474-4e71-83fc-9c2816d87ba2",
 *   "paymentType": "CASH",
 *   "servingType": "PICKUP",
 *   "paid": true,
 *   "notes": "tanpa es",
 *   "total": 240000,
 *   "transactionDetails": [
 *     {
 *       "product": {
 *         "id": "a41eb8fa-85f8-4855-9620-ba91736722ba",
 *         "name": "Mie Godog",
 *         "imageUrl": "https://sixro-gun.sgp1.cdn.digitaloceanspaces.com/kedaimaster/miegato_11zon.png"
 *       },
 *       "qty": 20,
 *       "unitPrice": 12000,
 *       "amount": 240000
 *     }
 *   ],
 *   "createdBy": "pasaardianputra@gamil.com",
 *   "createdOn": "2025-10-29T16:39:53",
 *   "updatedBy": "pasaardianputra@gamil.com",
 *   "updatedOn": "2025-10-29T16:39:53"
 * }
 */
export async function getTransactionById(id) {
  if (!id) throw new Error('Transaction ID is required');
  return apiRequest(`/api/v1/transactions/${id}`, 'GET');
}

export async function cancelTransactionById(id) {
  if (!id) throw new Error('Transaction ID is required');
  return apiRequest(`/api/v1/transactions/${id}/cancel`, 'PUT');
}
/**
 * GET: Ambil transaksi berdasarkan rentang tanggal
 * @param {string} startDate - Tanggal mulai, format string
 * @param {string} endDate - Tanggal akhir, format string
 * @returns {Promise<Array>} Respons dari server
 * 
 * Contoh respons (200 OK):
 * [
 *   {
 *     "id": "9ab3c211-5371-4a69-8204-83c375833d80",
 *     "refNo": "482243d3-1474-4e71-83fc-9c2816d87ba2",
 *     "paymentType": "CASH",
 *     "servingType": "PICKUP",
 *     "paid": true,
 *     "notes": "tanpa es",
 *     "total": 240000,
 *     "customerName": "Budi",
 *     "customerPhone": "08123456789",
 *     "createdBy": "pasaardianputra@gamil.com",
 *     "createdOn": "2025-10-29T16:39:53",
 *     "updatedBy": "pasaardianputra@gamil.com",
 *     "updatedOn": "2025-10-29T16:39:53"
 *   }
 * ]
 */
export async function getTransactionsByDateRange(startDate, endDate) {
  if (!startDate || !endDate) throw new Error('Start date and end date are required');
  return apiRequest(`/api/v1/transactions/${startDate}/${endDate}`, 'GET');
}
