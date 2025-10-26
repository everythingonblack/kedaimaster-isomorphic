import * as materialsApi from '@/kedaimaster-api/materialsApi';
import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/validators/common-rules';

/**
 * Tipe data material mentah dari API (sebelum dimapping ke UI)
 */
type ApiMaterial = {
  id: string;
  name: string;
  remarks?: string;
  uom?: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  imageUrl?: string; // Assuming material can have a direct image URL
  stock?: number;
  price?: {
    unitPrice: number;
  };
  status?: string;
  createdBy?: string;
  createdOn?: string;
  updatedBy?: string;
  updatedOn?: string;
};

/**
 * Type Material yang digunakan di frontend (UI)
 */
export type MaterialType = {
  id: string;
  name: string;
  
  remarks: string;
  uomName: string;
  uomImage: string;
  stock: number;
  price: number;
  status: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

/**
 * Schema untuk form material (Create/Edit)
 * Disesuaikan agar sejalan dengan ApiMaterial dan kebutuhan UI.
 */
export const materialFormSchema = z.object({
  name: z.string().min(1, { message: messages.materialNameIsRequired }), // Assuming materialNameIsRequired message
  categoryId: z.string().min(1, { message: messages.materialCategoryIsRequired }), // Assuming materialCategoryIsRequired message
  remarks: z.string().optional(),
  price: z.coerce
    .number({ required_error: messages.priceIsRequired })
    .min(0, { message: messages.priceMustBePositive }),
  stock: z
    .coerce
    .number()
    .min(0, { message: messages.stockMustBePositive })
    .optional()
    .default(0),
  image: fileSchema.optional(), // single file upload
});

export type ImageFormValue = {
  name: string;
  url: string;
  size: number;
  raw?: File;
};

export type CreateMaterialInput = z.infer<typeof materialFormSchema> & {
  image?: ImageFormValue | undefined;
};

/**
 * Helper untuk memetakan data dari ApiMaterial ke MaterialType
 */
function mapApiMaterialToMaterialType(item: ApiMaterial): MaterialType {
  return {
    id: item.id,
    name: item.name,
    remarks: item.remarks || '-',
    uomName: item.uom?.name || '-',
    uomImage: item.uom?.imageUrl || item.imageUrl || '/placeholder.png',
    stock: item.stock ?? 0,
    price: item.price?.unitPrice ?? 0,
    status: (item.stock ?? 0) > 0 ? 'Available' : 'Out of Stock',
    createdBy: item.createdBy || '-',
    createdOn: item.createdOn || '-',
    updatedBy: item.updatedBy || '-',
    updatedOn: item.updatedOn || '-',
  };
}

/**
 * Helper untuk memetakan data dari ApiMaterial ke CreateMaterialInput
 * Digunakan saat Edit Form (prefill data dari backend)
 */
function mapApiMaterialToCreateMaterialInput(item: ApiMaterial): CreateMaterialInput {
  return {
    name: item.name,
    categoryId: item.uom?.id ?? '', // Assuming uom.id for categoryId
    price: item.price?.unitPrice ?? 0,
    stock: item.stock ?? 0,
    remarks: item.remarks ?? '',
    image: item.uom?.imageUrl || item.imageUrl
      ? {
          name: (item.uom?.imageUrl || item.imageUrl)?.split('/').pop() || 'image',
          url: item.uom?.imageUrl || item.imageUrl || '',
          size: 0,
          raw: undefined,
        }
      : undefined,
  };
}

/**
 * Handler untuk mengambil semua material
 */
export async function fetchMaterials(): Promise<MaterialType[]> {
  try {
    const response = (await materialsApi.getAllMaterials()) as ApiMaterial[] | null;
    if (Array.isArray(response)) {
      return response.map(mapApiMaterialToMaterialType);
    }
    return [];
  } catch (error) {
    console.error('❌ Failed to fetch materials:', error);
    return [];
  }
}

/**
 * Handler untuk mengambil material berdasarkan ID
 */
export async function fetchMaterialById(id: string): Promise<CreateMaterialInput | undefined> {
  try {
    const item = (await materialsApi.getMaterialById(id)) as ApiMaterial | null;
    if (!item) {
      console.warn(`⚠️ Material with ID ${id} not found`);
      return undefined;
    }
    return mapApiMaterialToCreateMaterialInput(item);
  } catch (error) {
    console.error(`❌ Failed to fetch material by ID (${id}):`, error);
    return undefined;
  }
}

/**
 * Handler untuk membuat material baru
 */
export async function createMaterial(data: CreateMaterialInput) {
  try {
    const payload: any = { name: data.name, uomId: data.categoryId };
    if (data.remarks !== undefined) payload.remarks = data.remarks;
    return await materialsApi.createMaterial(payload);
  } catch (error) {
    console.error('❌ Failed to create material:', error);
    throw error;
  }
}

/**
 * Handler untuk hapus material
 */
export async function deleteMaterial(id: string) {
  try {
    return await materialsApi.deleteMaterial(id);
  } catch (error) {
    console.error(`❌ Failed to delete material (${id}):`, error);
    throw error;
  }
}

/**
 * Handler untuk update stok material
 */
export async function updateMaterialStock(id: string, data: { type: 'IN' | 'OUT'; qty: number }) {
  try {
    // Assuming an updateMaterialStock API call exists in materialsApi
    // return await materialsApi.updateMaterialStock(id, data);
    console.log('Updating material stock for ID:', id, 'with data:', data);
    return { success: true }; // Placeholder for actual API call
  } catch (error) {
    console.error(`❌ Failed to update material stock (${id}):`, error);
    throw error;
  }
}

/**
 * Handler untuk update harga material
 */
export async function updateMaterialPrice(id: string, data: { price: number; effectiveDate: string }) {
  try {
    // Assuming an updateMaterialPrice API call exists in materialsApi
    // return await materialsApi.updateMaterialPrice(id, data);
    console.log('Updating material price for ID:', id, 'with data:', data);
    return { success: true }; // Placeholder for actual API call
  } catch (error) {
    console.error(`❌ Failed to update material price (${id}):`, error);
    throw error;
  }
}

/**
 * Handler untuk update material secara smart
 */
export async function updateMaterial(id: string, data: CreateMaterialInput, oldData?: CreateMaterialInput) {
  // Update name, remarks, uomId jika ada perubahan
  const payload: any = {};

  console.log(data)
  console.log(oldData)
  payload.name = data.name;
  payload.uomId = data.categoryId;

  let result = null;
  if (Object.keys(payload).length > 0) {
    result = await materialsApi.updateMaterial(id, payload);
  }

  // Update stok jika ada field dan berubah
  if (typeof data.stock === 'number' && (!oldData || data.stock !== oldData.stock)) {
    const qty = Math.abs(data.stock - (oldData?.stock ?? 0));
    const type = data.stock > (oldData?.stock ?? 0) ? 'IN' : 'OUT';
    if (type === 'IN') {
      await materialsApi.stockInMaterial(id, qty, data.price);
    } else {
      await materialsApi.stockOutMaterial(id, qty);
    }
  }

  // Update price jika ada field dan berubah
  if (typeof data.price === 'number' && (!oldData || data.price !== oldData.price)) {
    // Note: Price update might need a separate API, but for now, it's handled in stockIn
  }

  return result;
}
