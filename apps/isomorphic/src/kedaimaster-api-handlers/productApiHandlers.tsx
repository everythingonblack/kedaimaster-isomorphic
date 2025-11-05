import * as productsApi from '@/kedaimaster-api/productsApi.js';
import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/validators/common-rules';
import { fetchMaterials } from './materialApiHandlers';

/**
 * Tipe data produk mentah dari API (sebelum dimapping ke UI)
 */
type ApiProduct = {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
  };
  imageUrl?: string;
  stock?: number;
  price?: {
    unitPrice: number;
  };
  description?: string;
  material?: string;       // bisa ID atau nama tergantung backend
  materialId?: string;     // antisipasi kalau backend pakai ini
  createdBy?: string;
  createdOn?: string;
};

/**
 * Type produk yang digunakan di tabel (UI-friendly)
 */
export type ProductType = {
  id: string;
  name: string;
  category: string;
  image: string;
  stock: number;
  price: string;
  status: string;
  material: string;
  createdBy: string;
  createdOn: string;
};

/**
 * Schema untuk form produk (Create/Edit)
 */
export const productFormSchema = z.object({
  name: z.string().min(1, { message: messages.productNameIsRequired }),
  categoryId: z.string().min(1, { message: messages.productCategoryIsRequired }),
  description: z.string().optional(),
  price: z.coerce
    .number({ required_error: messages.priceIsRequired })
    .min(0, { message: messages.priceMustBePositive }),
  stock: z.coerce.number().min(0, { message: messages.stockMustBePositive }).optional().default(0),
  material: z.string().optional(),
  image: fileSchema.optional(),
});

export type ImageFormValue = {
  name: string;
  url: string;
  size: number;
  raw?: File;
};

export type CreateProductInput = z.infer<typeof productFormSchema> & {
  image?: ImageFormValue | undefined;
};

/**
 * Helper untuk memetakan data dari ApiProduct ke ProductType
 */
function mapApiProductToProductType(item: ApiProduct, materialMap: Map<string, string>): ProductType {
  // ambil id material dari salah satu kemungkinan field
  const materialId = item.materialId || item.material;
  let materialName = 'N/A'; // Mengubah default dari '-' menjadi 'N/A'

  if (materialId) {
    materialName = materialMap.get(materialId) || materialId;
  }
  // TODO: Pastikan API backend mengembalikan 'material' atau 'materialId' untuk menampilkan data yang benar.

  return {
    id: item.id,
    name: item.name,
    category: item.category?.name || '-',
    image: item.imageUrl || '/placeholder.png',
    stock: item.stock ?? 0,
    price: item.price?.unitPrice ? item.price.unitPrice.toLocaleString('id-ID') : '0',
    status: (item.stock ?? 0) > 0 ? 'Available' : 'Out of Stock',
    material: materialName,
    createdBy: item.createdBy || '-',
    createdOn: item.createdOn || '-',
  };
}

/**
 * Helper untuk memetakan data dari ApiProduct ke CreateProductInput
 */
function mapApiProductToCreateProductInput(item: ApiProduct): CreateProductInput {
  return {
    name: item.name,
    categoryId: item.category?.id ?? '',
    price: item.price?.unitPrice ?? 0,
    stock: item.stock ?? 0,
    description: item.description ?? '',
    material: item.materialId || item.material || '',
    image: item.imageUrl
      ? {
          name: item.imageUrl.split('/').pop() || 'image',
          url: item.imageUrl,
          size: 0,
          raw: undefined,
        }
      : undefined,
  };
}

/**
 * Handler untuk mengambil semua produk
 */
export async function fetchProducts(): Promise<ProductType[]> {
  try {
    const [response, materials] = await Promise.all([
      productsApi.getAllProducts() as Promise<ApiProduct[] | null>,
      fetchMaterials(),
    ]);

    const materialMap = new Map<string, string>();
    materials.forEach((material) => {
      materialMap.set(material.id, material.name);
    });


    if (Array.isArray(response)) {
      return response.map((item) => mapApiProductToProductType(item, materialMap));
    }

    return [];
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
    return [];
  }
}

/**
 * Handler untuk mengambil produk berdasarkan ID
 */
export async function fetchProductById(id: string): Promise<CreateProductInput | undefined> {
  try {
    const item = (await productsApi.getProductById(id)) as ApiProduct | null;
    if (!item) {
      console.warn(`⚠️ Product with ID ${id} not found`);
      return undefined;
    }
    return mapApiProductToCreateProductInput(item);
  } catch (error) {
    console.error(`❌ Failed to fetch product by ID (${id}):`, error);
    return undefined;
  }
}

/**
 * Handler untuk membuat produk baru
 */
export async function createProduct(data: CreateProductInput) {
  try {
    const payload = { ...data, image: data.image ?? undefined };
    return await productsApi.createProduct(payload);
  } catch (error) {
    console.error('❌ Failed to create product:', error);
    throw error;
  }
}

/**
 * Handler untuk hapus produk
 */
export async function deleteProduct(id: string) {
  try {
    return await productsApi.deleteProduct(id);
  } catch (error) {
    console.error(`❌ Failed to delete product (${id}):`, error);
    throw error;
  }
}

/**
 * Handler untuk update stok produk
 */
export async function updateProductStock(id: string, data: { type: 'IN' | 'OUT'; qty: number }) {
  try {
    return await productsApi.updateProductStock(id, data);
  } catch (error) {
    console.error(`❌ Failed to update product stock (${id}):`, error);
    throw error;
  }
}

/**
 * Handler untuk update harga produk
 */
export async function updateProductPrice(id: string, data: { price: number; effectiveDate: string }) {
  try {
    return await productsApi.updateProductPrice(id, data);
  } catch (error) {
    console.error(`❌ Failed to update product price (${id}):`, error);
    throw error;
  }
}

/**
 * Handler untuk ambil daftar serving types
 */
export async function fetchServingTypes(): Promise<string[]> {
  try {
    return await productsApi.getServingTypes();
  } catch (error) {
    console.error('❌ Failed to fetch serving types:', error);
    return [];
  }
}

/**
 * Handler untuk ambil daftar payment types
 */
export async function fetchPaymentTypes(): Promise<string[]> {
  try {
    return await productsApi.getPaymentTypes();
  } catch (error) {
    console.error('❌ Failed to fetch payment types:', error);
    return [];
  }
}

/**
 * Handler untuk update produk secara smart
 */
export async function updateProduct(id: string, data: CreateProductInput, oldData?: CreateProductInput) {
  const payload: any = {};
  payload.name = data.name;
  payload.categoryId = data.categoryId;
  payload.material = data.material;
  if (data.image) payload.image = data.image;

  let result = null;
  if (Object.keys(payload).length > 0) {
    result = await productsApi.updateProduct(id, payload);
  }

  if (typeof data.stock === 'number' && (!oldData || data.stock !== oldData.stock)) {
    const qty = Math.abs(data.stock - (oldData?.stock ?? 0));
    const type = data.stock > (oldData?.stock ?? 0) ? 'IN' : 'OUT';
    await productsApi.updateProductStock(id, { type, qty });
  }

  if (typeof data.price === 'number' && (!oldData || data.price !== oldData.price)) {
    await productsApi.updateProductPrice(id, {
      price: data.price,
      effectiveDate: new Date().toISOString(),
    });
  }

  return result;
}
