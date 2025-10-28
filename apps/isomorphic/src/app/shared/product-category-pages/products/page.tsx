import { Link } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import { deleteProduct, fetchProducts, ProductType } from '@/kedaimaster-api-handlers/productApiHandlers';
import { useEffect } from 'react';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { productsListColumns } from '@/app/shared/ecommerce/product/product-list/columns';
import Table from '@core/components/table';
import TablePagination from '@core/components/table/pagination';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'E-Commerce' },
    { href: routes.dashboard.products, name: 'Products' },
    { name: 'List' },
  ],
};

export default function ProductsPage() {
  // gunakan useTanStackTable seperti script lama
  const { table, setData } = useTanStackTable<ProductType>({
    tableData: [],
    columnConfig: productsListColumns as any,
    options: {
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
      },
      meta: {
        handleDeleteRow: async (row: ProductType) => {
          try {
            await deleteProduct(row.id);
            setData((prev) => prev.filter((r) => r.id !== row.id));
            // Optionally refetch all products to ensure data consistency
            const updatedProducts = await fetchProducts();
            setData(updatedProducts);
          } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error, e.g., show a toast notification
          }
        },
        handleMultipleDelete: async (rows: ProductType[]) => {
          try {
            await Promise.all(rows.map((row) => deleteProduct(row.id)));
            setData((prev) => prev.filter((r) => !rows.some((s) => s.id === r.id)));
            // Optionally refetch all products to ensure data consistency
            const updatedProducts = await fetchProducts();
            setData(updatedProducts);
          } catch (error) {
            console.error('Error deleting multiple products:', error);
            // Handle error, e.g., show a toast notification
          }
        },
      },
      enableColumnResizing: false,
    },
  });

  // ambil data produk
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        console.log('Fetched products:', productData);
        setData(productData);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    getProducts();
  }, [setData]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={table.getRowModel().rows.map((r) => r.original)}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          />
          <Link to={routes.dashboard.createProduct} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Product
            </Button>
          </Link>
        </div>
      </PageHeader>

      <WidgetCard
        title="Product List"
        className={cn('p-0 lg:p-0')}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
        action={
          <Input
            type="search"
            clearable
            inputClassName="h-[36px]"
            placeholder="Search product..."
            onClear={() => table.setGlobalFilter('')}
            value={table.getState().globalFilter ?? ''}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
          />
        }
      >
        <Table
          table={table}
          variant="modern"
          classNames={{
            rowClassName: 'last:border-0',
          }}
        />
        <TablePagination table={table} className="p-4" />
      </WidgetCard>
    </>
  );
}