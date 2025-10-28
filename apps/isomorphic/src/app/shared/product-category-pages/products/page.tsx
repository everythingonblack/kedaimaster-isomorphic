'use client';

import { Link } from 'react-router-dom';
import { PiPlusBold, PiMagnifyingGlassBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button, Input } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { useEffect } from 'react';
import WidgetCard from '@core/components/cards/widget-card';
import Table from '@core/components/table';
import TablePagination from '@core/components/table/pagination';
import cn from '@core/utils/class-names';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { productCategoryColumns } from '@/app/shared/product-category-pages/product/product-list/columns';

import productCategoriesApiHandlers, {
  ProductCategory,
} from '@/kedaimaster-api-handlers/productCategoriesApiHandlers';

const pageHeader = {
  title: 'Product Categories',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'E-Commerce' },
    { href: routes.dashboard.products, name: 'Product Categories' },
    { name: 'List' },
  ],
};

export default function ProductCategoriesPage() {
  const { table, setData } = useTanStackTable<ProductCategory>({
    tableData: [],
    columnConfig: productCategoryColumns as any,
    options: {
      initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
      meta: {
        handleDeleteRow: async (row: ProductCategory) => {
          await productCategoriesApiHandlers.delete(row.id);
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await productCategoriesApiHandlers.getAll();
      setData(data);
    };
    fetchCategories();
  }, [setData]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={table.getRowModel().rows.map((r) => r.original)}
            fileName="product_categories"
            header="ID,Name,CreatedBy,CreatedOn,UpdatedBy,UpdatedOn"
          />
         <Link to={routes.dashboard.createCategories}>
            <Button>
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Category
            </Button>
          </Link>
        </div>
      </PageHeader>

      <WidgetCard
        title="Category List"
        className={cn('p-0 lg:p-0')}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
        action={
          <Input
            type="search"
            clearable
            inputClassName="h-[36px]"
            placeholder="Search category..."
            onClear={() => table.setGlobalFilter('')}
            value={table.getState().globalFilter ?? ''}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
          />
        }
      >
        <Table table={table} variant="modern" />
        <TablePagination table={table} className="p-4" />
      </WidgetCard>
    </>
  );
}
