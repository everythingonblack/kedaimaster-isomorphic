import { getAllProducts } from '@/kedaimaster-api/productsApi';
import { CreateProductInput } from '@/validators/create-product.schema';

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
      console.log('response', response);
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
      console.log(response)
      return mappedProducts;
    }

    return [];
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
    return [];
  }
}

/**
 * Handler untuk mengambil data produk berdasarkan ID dari backend
 * dan memetakan ke struktur ProductType agar cocok untuk UI.
 */
async function getProductById(id: string): Promise<ProductType | undefined> {
  try {
    // Ambil data produk dari API
    const response = await getAllProducts();

    // Validasi data berupa array
    if (Array.isArray(response)) {
      const foundProduct = response.find((item) => item.id === id);
      if (foundProduct) {
        const mappedProduct: ProductType = {
          id: foundProduct.id,
          name: foundProduct.name,
          category: foundProduct.category?.name || '-',
          image: foundProduct.imageUrl || '/placeholder.png',
          stock: foundProduct.stock ?? 0,
          price: foundProduct.price?.unitPrice
            ? foundProduct.price.unitPrice.toLocaleString('id-ID')
            : '0',
          status: foundProduct.stock > 0 ? 'Available' : 'Out of Stock',
        };
        return mappedProduct;
      }
    }

    return undefined;
  } catch (error) {
    console.error('❌ Failed to fetch product:', error);
    return undefined;
  }
}
export { getProductById };

/**
 * Handler untuk membuat produk baru.
 * @param productData Data produk yang akan dibuat.
 * @returns Produk yang baru dibuat atau null jika gagal.
 */
export async function createProduct(productData: CreateProductInput): Promise<ProductType | null> {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error('❌ Failed to create product:', response.status);
      return null;
    }

    const newProduct = (await response.json()) as ProductType;
    return newProduct;
  } catch (error) {
    console.error('❌ Failed to create product:', error);
    return null;
  }
}

/**
 * Handler untuk memperbarui produk.
 * @param id ID produk yang akan diperbarui.
 * @param productData Data produk yang akan diperbarui.
 * @returns Produk yang diperbarui atau null jika gagal.
 */
export async function updateProduct(id: string, productData: CreateProductInput): Promise<ProductType | null> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error('❌ Failed to update product:', response.status);
      return null;
    }

    const updatedProduct = (await response.json()) as ProductType;
    return updatedProduct;
  } catch (error) {
    console.error('❌ Failed to update product:', error);
    return null;
  }
}

/**
 * Handler untuk menghapus produk.
 * @param id ID produk yang akan dihapus.
 * @returns True jika berhasil dihapus, false jika gagal.
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('❌ Failed to delete product:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Failed to delete product:', error);
    return false;
  }
}

