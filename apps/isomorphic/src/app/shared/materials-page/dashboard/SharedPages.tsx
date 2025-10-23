'use client';

import { useEffect } from 'react';
import { fetchMaterials, MaterialType } from '@/kedaimaster-api-handlers/materialApiHandlers';
import { materialsListColumns } from '@/app/shared/materials-page/product/product-list/columns';

import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import Table from '@core/components/table';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';
import TablePagination from '@core/components/table/pagination';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

export default function MaterialStockReport({ className }: { className?: string }) {
  const { table, setData } = useTanStackTable<MaterialType>({
    tableData: [],
    columnConfig: materialsListColumns,
    options: {
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
      },
      meta: {
        handleDeleteRow: (row: MaterialType) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    const loadMaterials = async () => {
      const data = await fetchMaterials();
      setData(data);
    };
    loadMaterials();
  }, [setData]);

  return (
    <WidgetCard
      title="Material Stock Report"
      className={cn('p-0 lg:p-0', className)}
      headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
      action={
        <Input
          type="search"
          clearable
          inputClassName="h-[36px]"
          placeholder="Search material..."
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
  );
}
