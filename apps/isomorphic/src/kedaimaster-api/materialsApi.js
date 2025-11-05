import { apiRequest } from './authApi.js';

/**
 * Helper function to convert a File object to a Base64 string.
 * @param {File} file - The File object to convert.
 * @returns {Promise<string>} A promise that resolves with the Base64 string.
 */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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

  const payload = { ...data };

  if (imageFile) {
    payload.image = await fileToBase64(imageFile);
  }

  return apiRequest(`/api/v1/materials/${id}`, 'PUT', payload);
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

/**
 * GET: Ambil riwayat mutasi material (dummy data)
 *
 * @returns {Promise<Object>} Riwayat mutasi material
 *
 * ✅ RESPONSE 200 OK
 * Contoh respons sukses:
 * {
 *   "materialHistory": [
 *     {
 *       "id": "hist-001",
 *       "material": {
 *         "id": "MAT-001",
 *         "name": "Biji Kopi Arabica",
 *         "remarks": "Digunakan untuk espresso dan cappuccino",
 *         "uom": {
 *           "id": "UOM-001",
 *           "code": "GR",
 *           "name": "Gram",
 *           "remarks": "Satuan berat"
 *         }
 *       },
 *       "type": "CREATE",
 *       "description": "Pembuatan material baru untuk stok awal",
 *       "qty": 5000,
 *       "stockBefore": 0,
 *       "stockAfter": 5000,
 *       "createdBy": "admin",
 *       "createdOn": "2025-10-29T12:45:22.778Z"
 *     },
 *     {
 *       "id": "hist-002",
 *       "material": {
 *         "id": "MAT-001",
 *         "name": "Biji Kopi Arabica",
 *         "remarks": "Restok bahan dari supplier",
 *         "uom": {
 *           "id": "UOM-001",
 *           "code": "GR",
 *           "name": "Gram",
 *           "remarks": "Satuan berat"
 *         }
 *       },
 *       "type": "IN",
 *       "description": "Penambahan stok dari pemasok lokal",
 *       "qty": 2000,
 *       "unitPrice": 120000,
 *       "stockBefore": 5000,
 *       "stockAfter": 7000,
 *       "createdBy": "purchasing_team",
 *       "createdOn": "2025-10-29T12:50:00.000Z"
 *     },
 *     {
 *       "id": "hist-003",
 *       "material": {
 *         "id": "MAT-001",
 *         "name": "Biji Kopi Arabica",
 *         "remarks": "Pemakaian bahan untuk menu harian",
 *         "uom": {
 *           "id": "UOM-001",
 *           "code": "GR",
 *           "name": "Gram",
 *           "remarks": "Satuan berat"
 *         }
 *       },
 *       "type": "OUT",
 *       "description": "Pemakaian bahan untuk menu Espresso dan Cappuccino",
 *       "qty": 350,
 *       "stockBefore": 7000,
 *       "stockAfter": 6650,
 *       "createdBy": "barista_1",
 *       "createdOn": "2025-10-29T13:00:00.000Z"
 *     }
 *   ]
 * }
 */
export async function getMaterialMutationHistory() {
  return Promise.resolve({
    materialHistory : [
      {
        id: "hist-001",
        material: {
          id: "MAT-001",
          name: "Biji Kopi Arabica",
          remarks: "Digunakan untuk espresso dan cappuccino",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "CREATE",
        description: "Pembuatan material baru (stok awal)",
        qty: 5000,
        stockBefore: 0,
        stockAfter: 5000,
        createdBy: "admin",
        createdOn: "2025-10-29T08:00:00.000Z",
      },
      {
        id: "hist-002",
        material: {
          id: "MAT-002",
          name: "Susu Full Cream",
          remarks: "Digunakan untuk latte dan cappuccino",
          uom: {
            id: "UOM-002",
            code: "LTR",
            name: "Liter",
            remarks: "Satuan cairan",
          },
        },
        type: "CREATE",
        description: "Pembuatan material baru (stok awal)",
        qty: 20,
        stockBefore: 0,
        stockAfter: 20,
        createdBy: "admin",
        createdOn: "2025-10-29T08:05:00.000Z",
      },
      {
        id: "hist-003",
        material: {
          id: "MAT-003",
          name: "Gula Pasir",
          remarks: "Digunakan untuk minuman manis dan kopi",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "CREATE",
        description: "Pembuatan material baru (stok awal)",
        qty: 10000,
        stockBefore: 0,
        stockAfter: 10000,
        createdBy: "admin",
        createdOn: "2025-10-29T08:10:00.000Z",
      },
      {
        id: "hist-004",
        material: {
          id: "MAT-004",
          name: "Sirup Hazelnut",
          remarks: "Digunakan untuk varian latte dan frappé",
          uom: {
            id: "UOM-002",
            code: "LTR",
            name: "Liter",
            remarks: "Satuan cairan",
          },
        },
        type: "CREATE",
        description: "Pembuatan material baru (stok awal)",
        qty: 10,
        stockBefore: 0,
        stockAfter: 10,
        createdBy: "admin",
        createdOn: "2025-10-29T08:15:00.000Z",
      },
      {
        id: "hist-005",
        material: {
          id: "MAT-005",
          name: "Coklat Bubuk Premium",
          remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "CREATE",
        description: "Pembuatan material baru (stok awal)",
        qty: 3000,
        stockBefore: 0,
        stockAfter: 3000,
        createdBy: "admin",
        createdOn: "2025-10-29T08:20:00.000Z",
      },

      // ======== Mutasi Masuk (Stock In) ========
      {
        id: "hist-006",
        material: {
          id: "MAT-001",
          name: "Biji Kopi Arabica",
           remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "IN",
        description: "Restok bahan kopi dari supplier lokal",
        qty: 2000,
        unitPrice: 120000,
        stockBefore: 5000,
        stockAfter: 7000,
        createdBy: "purchasing_team",
        createdOn: "2025-10-29T09:00:00.000Z",
      },
      {
        id: "hist-007",
        material: {
          id: "MAT-002",
          name: "Susu Full Cream",
           remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "IN",
        description: "Restok susu dari supplier PT Dairy Fresh",
        qty: 10,
        unitPrice: 18000,
        stockBefore: 20,
        stockAfter: 30,
        createdBy: "purchasing_team",
        createdOn: "2025-10-29T09:15:00.000Z",
      },

      // ======== Mutasi Keluar (Stock Out) ========
      {
        id: "hist-008",
        material: {
          id: "MAT-001",
          name: "Biji Kopi Arabica",
           remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "OUT",
        description: "Pemakaian untuk menu espresso & cappuccino harian",
        qty: 400,
        stockBefore: 7000,
        stockAfter: 6600,
        createdBy: "barista_1",
        createdOn: "2025-10-29T10:00:00.000Z",
      },
      {
        id: "hist-009",
        material: {
          id: "MAT-002",
          name: "Susu Full Cream",
           remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "OUT",
        description: "Pemakaian susu untuk menu latte & mocha",
        qty: 3,
        stockBefore: 30,
        stockAfter: 27,
        createdBy: "barista_2",
        createdOn: "2025-10-29T10:10:00.000Z",
      },
      {
        id: "hist-010",
        material: {
          id: "MAT-004",
          name: "Sirup Hazelnut",
           remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "OUT",
        description: "Pemakaian sirup untuk 5 gelas hazelnut latte",
        qty: 0.25,
        stockBefore: 10,
        stockAfter: 9.75,
        createdBy: "barista_3",
        createdOn: "2025-10-29T10:30:00.000Z",
      },
      {
        id: "hist-011",
        material: {
          id: "MAT-005",
          name: "Coklat Bubuk Premium",
           remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "OUT",
        description: "Pemakaian bahan untuk hot chocolate & mocha",
        qty: 250,
        stockBefore: 3000,
        stockAfter: 2750,
        createdBy: "barista_1",
        createdOn: "2025-10-29T10:40:00.000Z",
      },
      {
        id: "hist-012",
        material: {
          id: "MAT-003",
          name: "Gula Pasir",
           remarks: "Digunakan untuk mocha dan hot chocolate",
          uom: {
            id: "UOM-001",
            code: "GR",
            name: "Gram",
            remarks: "Satuan berat",
          },
        },
        type: "OUT",
        description: "Pemakaian gula untuk semua menu hari ini",
        qty: 600,
        stockBefore: 10000,
        stockAfter: 9400,
        createdBy: "barista_2",
        createdOn: "2025-10-29T11:00:00.000Z",
      },
    ]
  });
}
