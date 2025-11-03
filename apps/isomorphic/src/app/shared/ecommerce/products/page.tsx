import { Link } from "react-router-dom";
import { PiPlusBold, PiMagnifyingGlassBold, PiTrashBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button } from "rizzui/button";
import {
  deleteProduct,
  fetchProducts,
  ProductType,
} from "@/kedaimaster-api-handlers/productApiHandlers";
import { useEffect } from "react";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { productsListColumns } from "@/app/shared/ecommerce/product/product-list/columns";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import { Input } from "rizzui";
import WidgetCard from "@core/components/cards/widget-card";
import cn from "@core/utils/class-names";

const pageHeader = {
  title: "Products",
  breadcrumb: [
    { href: routes.dashboard.main, name: "E-Commerce" },
    { href: routes.dashboard.products, name: "Products" },
    { name: "List" },
  ],
};

export default function ProductsPage() {
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
            const updatedProducts = await fetchProducts();
            setData(updatedProducts);
          } catch (error) {
            console.error("Error deleting product:", error);
          }
        },
        handleMultipleDelete: async (rows: ProductType[]) => {
          try {
            await Promise.all(rows.map((row) => deleteProduct(row.id)));
            setData((prev) =>
              prev.filter((r) => !rows.some((s) => s.id === r.id))
            );
            const updatedProducts = await fetchProducts();
            setData(updatedProducts);
          } catch (error) {
            console.error("Error deleting multiple products:", error);
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
        console.log("Fetched products:", productData);
        setData(productData);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, [setData]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex flex-wrap items-center gap-3 @lg:mt-0">
          {table.getSelectedRowModel().rows.length > 0 ? (
            <Button
              onClick={() =>
                table.options.meta?.handleMultipleDelete?.(
                  table.getSelectedRowModel().rows.map((r) => r.original)
                )
              }
              className="flex items-center gap-2 bg-[#C7362B] hover:bg-[#A42C22] text-white transition-all duration-200"
            >
              <PiTrashBold className="h-4 w-4" />
              Delete Selected ({table.getSelectedRowModel().rows.length})
            </Button>
          ) : (
            <>
              <ExportButton
                data={table.getRowModel().rows.map((r) => r.original)}
                fileName="product_data"
                header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
              />
              <Link
                to={routes.dashboard.createProduct}
                className="w-full @lg:w-auto"
              >
                <Button
                  as="span"
                  className="w-full @lg:w-auto bg-[#2F7F7A] text-white hover:bg-[#276B67]"
                >
                  <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                  Add Product
                </Button>
              </Link>
            </>
          )}
        </div>
      </PageHeader>

      <WidgetCard
        title="Product List"
        className={cn("p-0 lg:p-0")}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
        action={
          <Input
            type="search"
            clearable
            inputClassName="h-[36px]"
            placeholder="Search product..."
            onClear={() => table.setGlobalFilter("")}
            value={table.getState().globalFilter ?? ""}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
          />
        }
      >
        {/* ✅ Wrapper untuk tampilan tabel bergaya Excel */}
        <div className="w-full overflow-x-auto border border-gray-300 rounded-md shadow-sm">
          <Table
            table={table}
            variant="modern"
            classNames={{
              tableClassName: "min-w-full",
              headerClassName:
                "bg-gray-100 text-gray-700 border-b border-gray-300",
              rowClassName:
                "hover:bg-gray-50 border-b border-gray-200 last:border-0",
              cellClassName:
                "px-4 py-2 text-sm border-r border-gray-200 last:border-r-0",
            }}
          />
        </div>

        <TablePagination table={table} className="p-4" />
      </WidgetCard>
    </>
  );
}
