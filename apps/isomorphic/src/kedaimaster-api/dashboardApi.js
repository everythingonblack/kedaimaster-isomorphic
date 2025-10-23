import { apiRequest } from './authApi.js';

// ===========================================
// DASHBOARD API
// ===========================================

/**
 * GET: Ambil dashboard data dari startDate sampai endDate
 * @param {string} startDate - tanggal mulai, format YYYY-MM-DD
 * @param {string} endDate - tanggal akhir, format YYYY-MM-DD
 * @returns {Promise<Object>} response dashboard
 */
export async function getDashboard(startDate, endDate) {
  const endpoint = `/api/v1/dashboard/${startDate}/${endDate}`;
  return apiRequest(endpoint, 'GET');
}

/**
 * GET: Ambil data agregat dashboard berdasarkan tanggal dan interval jam
 * @param {string} date - tanggal, format YYYY-MM-DD
 * @param {number} intervalHour - interval jam sebagai integer
 * @returns {Promise<Array>} response data agregat
 */
export async function getDashboardAggregate(date, intervalHour) {
  const endpoint = `/api/v1/dashboard/aggregate/${date}/${intervalHour}`;
  return apiRequest(endpoint, 'GET');
}
