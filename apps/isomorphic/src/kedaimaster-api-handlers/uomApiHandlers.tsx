import {
  getAllUoms,
  getUomById,
  createUom,
  updateUom,
  deleteUom,
  getUomDropdown,
} from '@/kedaimaster-api/uomApi';

// ======================
// 🔹 Type Definitions
// ======================
export type Uom = {
  id: string;
  name: string;
  remarks?: string;
  createdBy?: string;
  createdOn?: string; // ISO date string, e.g. "2025-10-29T12:34:56Z"
  updatedOn?: string; // ISO date string
};

export type UomDropdown = {
  id: string;
  code: string;
  name: string;
  imageUrl?: string;
};

export type CreateUomRequest = Omit<Uom, 'id' | 'createdOn' | 'updatedOn'>;
export type UpdateUomRequest = Omit<Uom, 'id' | 'createdOn' | 'updatedOn'>;

// ======================
// 🔹 API Handlers
// ======================
const uomApiHandlers = {
  async getAll(): Promise<Uom[]> {
    try {
      const response = await getAllUoms();
      // Normalize / ensure expected structure
      return (response as Uom[]).map((item) => ({
        id: item.id,
        name: item.name,
        remarks: item.remarks || '',
        createdBy: item.createdBy || 'Unknown',
        createdOn: item.createdOn || '',
        updatedOn: item.updatedOn || '',
      }));
    } catch (error) {
      console.error('❌ Failed to get all UOMs:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Uom> {
    try {
      const response = await getUomById(id);
      return response as Uom;
    } catch (error) {
      console.error('❌ Failed to get UOM by id:', error);
      throw error;
    }
  },

  async create(uomData: CreateUomRequest): Promise<Uom> {
    try {
      const response = await createUom(uomData);
      return response as Uom;
    } catch (error) {
      console.error('❌ Failed to create UOM:', error);
      throw error;
    }
  },

  async update(id: string, uomData: UpdateUomRequest): Promise<Uom> {
    try {
      const response = await updateUom(id, uomData);
      return response as Uom;
    } catch (error) {
      console.error('❌ Failed to update UOM:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteUom(id);
    } catch (error) {
      console.error('❌ Failed to delete UOM:', error);
      throw error;
    }
  },

  async getDropdown(): Promise<UomDropdown[]> {
    try {
      const response = await getUomDropdown();
      return response as UomDropdown[];
    } catch (error) {
      console.error('❌ Failed to get UOM dropdown:', error);
      throw error;
    }
  },
};

export default uomApiHandlers;
