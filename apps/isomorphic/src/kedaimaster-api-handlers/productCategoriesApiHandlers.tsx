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

// Define the types based on the productCategoriesApi.js
export type ProductCategory = {
  images: { name: string; url: string; size: number; }[] | ({ name?: string | undefined; url?: string | undefined; size?: number | undefined; } | undefined)[] | undefined;
  description: string;
  parentCategory: string;
  type: string;
  slug: string | undefined; id: string; name: string; imageUrl: string; createdBy: string; createdOn: string; updatedBy: string; updatedOn: string; 
};
export type ProductCategoryDropdown = { id: string; code: string; name: string; imageUrl: string; };
export type Product = { id: string; name: string; imageUrl: string; category: { id: string; code: string; name: string; imageUrl: string; }; price: { id: string; effectiveDate: string; unitPrice: number; active: boolean; createdBy: string; createdOn: string; updatedBy: string; updatedOn: string; }; stocking: boolean; stock: number; createdBy: string; createdOn: string; updatedBy: string; updatedOn: string; };
export type DatatableResponse = { draw: number; recordsTotal: number; recordsFiltered: number; data: any[]; };

const productCategoriesApiHandlers = {
  async getAll(): Promise<ProductCategory[]> {
    try {
      return await getAllProductCategories() as ProductCategory[];
    } catch (error) {
      console.error("Failed to get all product categories:", error);
      throw error;
    }
  },
  async getById(id: string): Promise<ProductCategory> {
    try {
      const response = await getProductCategoryById(id);
      return response as ProductCategory;
    } catch (error) {
      console.error("Failed to get product category by id:", error);
      throw error;
    }
  },
  async create(data: any): Promise<ProductCategory> {
    try {
      return await createProductCategory(data) as ProductCategory;
    } catch (error) {
      console.error("Failed to create product category:", error);
      throw error;
    }
  },
  async update(id: string, data: any): Promise<ProductCategory> {
    try {
      return await updateProductCategory(id, data) as ProductCategory;
    } catch (error) {
      console.error("Failed to update product category:", error);
      throw error;
    }
  },
  async delete(id: string): Promise<void> {
    try {
      await deleteProductCategory(id);
    } catch (error) {
      console.error("Failed to delete product category:", error);
      throw error;
    }
  },
  async getProducts(id: string): Promise<Product[]> {
    try {
      return await getProductsByCategoryId(id) as Product[];
    } catch (error) {
      console.error("Failed to get products by category id:", error);
      throw error;
    }
  },
  async getDropdown(): Promise<ProductCategoryDropdown[]> {
    try {
      return await getProductCategoryDropdown() as ProductCategoryDropdown[];
    } catch (error) {
      console.error("Failed to get product category dropdown:", error);
      throw error;
    }
  },
  async getDatatable(body: any): Promise<DatatableResponse> {
    try {
      return await getProductCategoryDatatable(body) as DatatableResponse;
    } catch (error) {
      console.error("Failed to get product category datatable:", error);
      throw error;
    }
  },
};

export default productCategoriesApiHandlers;