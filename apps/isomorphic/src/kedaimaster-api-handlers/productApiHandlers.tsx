import * as productsApi from '@/kedaimaster-api/productsApi';
import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/validators/common-rules';

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
  createdBy?: string;
  createdOn?: string;
};

/**
 * Type produk yang digunakan di tabel Stock Report (UI-friendly)
 */
export type ProductType = {
  id: string;
  name: string;
  category: string;
  image: string;
  stock: number;
  price: string;
  status: string;
  createdBy: string;
  createdOn: string;
};

/**
 * Schema untuk form produk (Create/Edit)
 * Disesuaikan agar sejalan dengan ApiProduct dan kebutuhan UI.
 */
export const productFormSchema = z.object({
  name: z.string().min(1, { message: messages.productNameIsRequired }),

  categoryId: z.string().min(1, { message: messages.productCategoryIsRequired }),

  description: z.string().optional(),

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

export type CreateProductInput = z.infer<typeof productFormSchema> & {
  image?: ImageFormValue | undefined;
};

/**
 * Helper untuk memetakan data dari ApiProduct ke ProductType
 */
function mapApiProductToProductType(item: ApiProduct): ProductType {
  return {
    id: item.id,
    name: item.name,
    category: item.category?.name || '-',
    image: item.imageUrl || '/placeholder.png',
    stock: item.stock ?? 0,
    price: item.price?.unitPrice
      ? item.price.unitPrice.toLocaleString('id-ID')
      : '0',
    status: (item.stock ?? 0) > 0 ? 'Available' : 'Out of Stock',
    createdBy: item.createdBy || '-',
    createdOn: item.createdOn || '-',
  };
}

/**
 * Helper untuk memetakan data dari ApiProduct ke CreateProductInput
 * Digunakan saat Edit Form (prefill data dari backend)
 */
function mapApiProductToCreateProductInput(item: ApiProduct): CreateProductInput {
  return {
    name: item.name,
    categoryId: item.category?.id ?? '',
    price: item.price?.unitPrice ?? 0,
    stock: item.stock ?? 0,
    description: item.description ?? '',
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
    const response = (await productsApi.getAllProducts()) as ApiProduct[] | null;
    if (Array.isArray(response)) {
      return response.map(mapApiProductToProductType);
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
  // Update name, categoryId, image jika ada perubahan
  const payload: any = {};
  payload.name = data.name;
  payload.categoryId = data.categoryId;
  if (data.image) payload.image = data.image;

  let result = null;
  if (Object.keys(payload).length > 0) {
    result = await productsApi.updateProduct(id, payload);
  }

  // Update stok jika ada field dan berubah
  if (typeof data.stock === 'number' && (!oldData || data.stock !== oldData.stock)) {
    const qty = Math.abs(data.stock - (oldData?.stock ?? 0));
    const type = data.stock > (oldData?.stock ?? 0) ? 'IN' : 'OUT';
    await productsApi.updateProductStock(id, { type, qty });
  }

  // Update price jika ada field dan berubah
  if (typeof data.price === 'number' && (!oldData || data.price !== oldData.price)) {
    await productsApi.updateProductPrice(id, {
      price: data.price,
      effectiveDate: new Date().toISOString(),
    });
  }

  return result;
}




