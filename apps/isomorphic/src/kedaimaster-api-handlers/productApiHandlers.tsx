import { getAllProducts } from '@/kedaimaster-api/productsApi';

/**
 * Type produk yang digunakan di tabel Stock Report.
 */
export type ProductType = {
  id: string;
  name: string;
  category: string;
  image: string;
  stock: number;
  price: string;
  status: string;
};

/**
 * Handler untuk mengambil data produk dari backend
 * dan memetakan ke struktur ProductType agar cocok untuk UI.
 */
export async function fetchProducts(): Promise<ProductType[]> {
  try {
    // Ambil data produk dari API
    const response = await getAllProducts();

    // Validasi data berupa array
    if (Array.isArray(response)) {
      const mappedProducts: ProductType[] = response.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category?.name || '-',
        image: item.imageUrl || '/placeholder.png',
        stock: item.stock ?? 0,
        price: item.price?.unitPrice
          ? item.price.unitPrice.toLocaleString('id-ID')
          : '0',
        status: item.stock > 0 ? 'Available' : 'Out of Stock',
      }));

      return mappedProducts;
    }

    return [];
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
    return [];
  }
}
