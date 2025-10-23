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
 */
export async function createTransaction(transactionData) {
  if (!transactionData) throw new Error('Transaction data is required');
  return apiRequest('/api/v1/transactions', 'POST', transactionData);
}

/**
 * GET: Ambil transaksi berdasarkan ID
 * @param {string} id - ID transaksi
 */
export async function getTransactionById(id) {
  if (!id) throw new Error('Transaction ID is required');
  return apiRequest(`/api/v1/transactions/${id}`, 'GET');
}

/**
 * GET: Ambil transaksi berdasarkan rentang tanggal
 * @param {string} startDate - Tanggal mulai, format string
 * @param {string} endDate - Tanggal akhir, format string
 */
export async function getTransactionsByDateRange(startDate, endDate) {
  if (!startDate || !endDate) throw new Error('Start date and end date are required');
  return apiRequest(`/api/v1/transactions/${startDate}/${endDate}`, 'GET');
}
