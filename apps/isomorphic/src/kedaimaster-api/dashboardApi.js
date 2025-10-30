import { apiRequest } from './authApi.js';

// ===========================================
// DASHBOARD API
// ===========================================

/**
 * GET: Ambil dashboard data dari startDate sampai endDate
 *
 * @param {string} startDate - tanggal mulai, format YYYY-MM-DD
 * @param {string} endDate - tanggal akhir, format YYYY-MM-DD
 * @returns {Promise<Object>} Response dashboard
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * {
 *   "income": 0,             // total pendapatan
 *   "outcome": 0,            // total pengeluaran
 *   "transaction": 1073741824, // jumlah transaksi
 *   "topProducts": [         // daftar produk terlaris
 *     {
 *       "id": "string",
 *       "name": "string",
 *       "imageUrl": "string",
 *       "total": 0.1          // total nominal per produk
 *     }
 *   ],
 *   "topProduct": {          // produk terlaris utama
 *     "id": "string",
 *     "name": "string",
 *     "imageUrl": "string",
 *     "total": 0.1
 *   }
 * }
 *
 * ❌ Kemungkinan error:
 * 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity
 */
export async function getDashboard(startDate, endDate) {
  const endpoint = `/api/v1/dashboard/${startDate}/${endDate}`;
  return apiRequest(endpoint, 'GET');
}

/**
 * GET: Ambil data agregat dashboard berdasarkan tanggal dan interval jam
 *
 * @param {string} date - tanggal, format YYYY-MM-DD
 * @param {number} intervalHour - interval jam (misal 1, 2, 4, 6, 12)
 * @returns {Promise<Array>} Response data agregat
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * [
 *   {
 *     "seq": 1073741824,              // urutan interval
 *     "startDate": "2025-10-23T09:07:59.099Z", // waktu mulai interval
 *     "endDate": "2025-10-23T09:07:59.099Z",   // waktu akhir interval
 *     "txCount": 9007199254740991,    // jumlah transaksi
 *     "totalAmount": 0,               // total nominal transaksi
 *     "totalQty": 9007199254740991    // total kuantitas item terjual
 *   }
 * ]
 *
 * ❌ Kemungkinan error:
 * 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity
 */
export async function getDashboardAggregate(startDate, endDate, type, intervalHour) {
  let endpoint = `/api/v1/dashboard/aggregate/${startDate}/${endDate}`;
  if (type) {
    endpoint += `?type=${type}`;
  }
  if (intervalHour) {
    endpoint += `${type ? '&' : '?'}intervalHour=${intervalHour}`;
  }
  return apiRequest(endpoint, 'GET');
}
