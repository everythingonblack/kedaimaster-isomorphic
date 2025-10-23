import { getAllMaterials } from '@/kedaimaster-api/materialsApi';

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
  status: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

/**
 * Handler: Ambil semua material dari backend
 * dan ubah jadi format yang siap untuk UI.
 */
export async function fetchMaterials(): Promise<MaterialType[]> {
  try {
    const response = await getAllMaterials();

    if (Array.isArray(response)) {
      const mappedMaterials: MaterialType[] = response.map((item) => ({
        id: item.id,
        name: item.name,
        remarks: item.remarks || '-',
        uomName: item.uom?.name || '-',
        uomImage:
          item.uom?.imageUrl ||
          'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
        stock: item.stock ?? 0,
        status: item.stock > 0 ? 'Available' : 'Out of Stock',
        createdBy: item.createdBy || '-',
        createdOn: item.createdOn || '-',
        updatedBy: item.updatedBy || '-',
        updatedOn: item.updatedOn || '-',
      }));

      return mappedMaterials;
    }

    return [];
  } catch (error) {
    console.error('❌ Failed to fetch materials:', error);
    return [];
  }
}
