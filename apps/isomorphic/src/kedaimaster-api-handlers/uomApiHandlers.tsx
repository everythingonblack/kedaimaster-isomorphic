// apps/isomorphic/src/kedaimaster-api-handlers/uomApiHandlers.tsx

import { getAllUoms, getUomById, createUom, updateUom, deleteUom, getUomDropdown } from '@/kedaimaster-api/uomApi';

// Define the types based on the uomApi.js
export type Uom = { id: string; name: string; remarks?: string; };
export type UomDropdown = { id: string; code: string; name: string; imageUrl: string; };
export type CreateUomRequest = Omit<Uom, 'id'>;
export type UpdateUomRequest = Omit<Uom, 'id'>;

const uomApiHandlers = {
  async getAll(): Promise<Uom[]> {
    try {
      return await getAllUoms() as Uom[];
    } catch (error) {
      console.error("Failed to get all UOMs:", error);
      throw error;
    }
  },
  async getById(id: string): Promise<Uom> {
    try {
      const response = await getUomById(id);
      return response as Uom;
    } catch (error) {
      console.error("Failed to get UOM by id:", error);
      throw error;
    }
  },
  async create(uomData: CreateUomRequest): Promise<Uom> {
    try {
      return await createUom(uomData) as Uom;
    } catch (error) {
      console.error("Failed to create UOM:", error);
      throw error;
    }
  },
  async update(id: string, uomData: UpdateUomRequest): Promise<Uom> {
    try {
      return await updateUom(id, uomData) as Uom;
    } catch (error) {
      console.error("Failed to update UOM:", error);
      throw error;
    }
  },
  async delete(id: string): Promise<void> {
    try {
      await deleteUom(id);
    } catch (error) {
      console.error("Failed to delete UOM:", error);
      throw error;
    }
  },
  async getDropdown(): Promise<UomDropdown[]> {
    try {
      return await getUomDropdown() as UomDropdown[];
    } catch (error) {
      console.error("Failed to get UOM dropdown:", error);
      throw error;
    }
  },
};

export default uomApiHandlers;