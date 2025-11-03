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

export type ImageFormValue = {
  name: string;
  url: string;
  size: number;
  raw?: File;
};

// ================================
// ✅ TYPES (matched to API)
// ================================
export type ApiProductCategory = {
  id: string;
  name: string;
  imageUrl?: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

export type ProductCategory = ApiProductCategory;

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
// ✅ FORM SCHEMA (with image support)
// ================================
export const productCategoryFormSchema = z.object({
  name: z.string().min(1, { message: messages.productCategoryNameIsRequired }),
  image: fileSchema.optional(),
});


export type CreateProductCategoryInput = z.infer<typeof productCategoryFormSchema>;

// ================================
// ✅ MAPPERS (for form binding)
// ================================
export function mapApiCategoryToFormInput(item: ApiProductCategory): CreateProductCategoryInput {
  return {
    name: item.name,
    image: item.imageUrl ? {
      name: item.imageUrl.split('/').pop() || 'image',
      url: item.imageUrl,
      size: 0,
      raw: undefined,
    } : undefined,
  };
}

// ================================
// ✅ API HANDLERS
// ================================
const productCategoriesApiHandlers = {
  async getAll(): Promise<ProductCategory[]> {
    return await getAllProductCategories() as ProductCategory[];
  },

  async getById(id: string): Promise<ApiProductCategory | undefined> {
    try {
      const category = await getProductCategoryById(id) as ApiProductCategory;
      return category;
    } catch (error) {
      console.error(`❌ Failed to fetch category by ID (${id}):`, error);
      return undefined;
    }
  },

  async create(data: CreateProductCategoryInput): Promise<ProductCategory> {
      const payload = { ...data, image: data.image?.raw };
      return await createProductCategory(payload) as ProductCategory;
    },

  async update(id: string, data: CreateProductCategoryInput): Promise<ProductCategory> {
      const payload = { ...data, image: data.image?.raw };
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
