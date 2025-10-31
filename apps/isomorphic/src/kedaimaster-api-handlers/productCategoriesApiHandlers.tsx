// apps/isomorphic/src/kedaimaster-api-handlers/productCategoriesApiHandlers.tsx

import {
  getAllProductCategories,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductsByCategoryId,
  getProductCategoryDropdown,
  getProductCategoryDatatable,
} from '@/kedaimaster-api/productCategoriesApi';
import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/validators/common-rules';

// ================================
// ✅ TYPES (matched to API)
// ================================

export type ProductCategory = {
  id: string;
  name: string;
  imageUrl?: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

export type ProductCategoryDropdown = {
  id: string;
  code: string;
  name: string;
  imageUrl?: string;
};

export type Product = {
  id: string;
  name: string;
  imageUrl?: string;
  category: {
    id: string;
    code: string;
    name: string;
    imageUrl?: string;
  };
  price: {
    id: string;
    effectiveDate: string;
    unitPrice: number;
    active: boolean;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
  };
  stocking: boolean;
  stock: number;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

export type DatatableResponse = {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
};

// ================================
// ✅ FORM SCHEMA (matched to API)
// ================================
export const productCategoryFormSchema = z.object({
  name: z.string().min(1, { message: messages.productCategoryNameIsRequired }),
  image: fileSchema.optional(), // single file upload
});

export type CreateProductCategoryInput = z.infer<typeof productCategoryFormSchema>;

// ================================
// ✅ API HANDLERS
// ================================
const productCategoriesApiHandlers = {
  async getAll(): Promise<ProductCategory[]> {
    return await getAllProductCategories() as ProductCategory[];
  },

  async getById(id: string): Promise<ProductCategory> {
    return await getProductCategoryById(id) as ProductCategory;
  },

  async create(data: CreateProductCategoryInput): Promise<ProductCategory> {
    const payload = { ...data, image: data.image?.raw ?? undefined };
    return await createProductCategory(payload) as ProductCategory;
  },

  async update(id: string, data: CreateProductCategoryInput): Promise<ProductCategory> {
    const payload = { ...data, image: data.image?.raw ?? undefined };
    return await updateProductCategory(id, payload) as ProductCategory;
  },

  async delete(id: string): Promise<void> {
    await deleteProductCategory(id);
  },

  async getProducts(id: string): Promise<Product[]> {
    return await getProductsByCategoryId(id) as Product[];
  },

  async getDropdown(): Promise<ProductCategoryDropdown[]> {
    return await getProductCategoryDropdown() as ProductCategoryDropdown[];
  },

  async getDatatable(body: any): Promise<DatatableResponse> {
    return await getProductCategoryDatatable(body) as DatatableResponse;
  },
};

export default productCategoriesApiHandlers;
