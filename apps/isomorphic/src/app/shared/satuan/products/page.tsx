import { Link } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import uomApiHandlers, { Uom } from '@/kedaimaster-api-handlers/uomApiHandlers';
import { useEffect } from 'react';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { uomListColumns } from '@/app/shared/satuan/product/product-list/columns';
import Table from '@core/components/table';
import TablePagination from '@core/components/table/pagination';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';

const pageHeader = {
  title: 'Satuan',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'Dashboard' },
    { href: routes.dashboard.products, name: 'Satuan' }, // Assuming products route will be changed to uoms
    { name: 'List' },
  ],
};

export default function UomPage() {
  const { table, setData } = useTanStackTable<Uom>({
    tableData: [],
    columnConfig: uomListColumns as any,
    options: {
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
      },
      meta: {
        handleDeleteRow: async (row: Uom) => {
          try {
            await uomApiHandlers.delete(row.id);
            setData((prev) => prev.filter((r) => r.id !== row.id));
            const updatedUoms = await uomApiHandlers.getAll();
            setData(updatedUoms);
          } catch (error) {
            console.error('Error deleting UOM:', error);
          }
        },
        handleMultipleDelete: async (rows: Uom[]) => {
          try {
            await Promise.all(rows.map((row) => uomApiHandlers.delete(row.id)));
            setData((prev) => prev.filter((r) => !rows.some((s) => s.id === r.id)));
            const updatedUoms = await uomApiHandlers.getAll();
            setData(updatedUoms);
          } catch (error) {
            console.error('Error deleting multiple UOMs:', error);
          }
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    const getUoms = async () => {
      try {
        const uomData = await uomApiHandlers.getAll();
        console.log('Fetched UOMs:', uomData);
        setData(uomData);
      } catch (err) {
        console.error('Error fetching UOMs:', err);
      }
    };
    getUoms();
  }, [setData]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={table.getRowModel().rows.map((r) => r.original)}
            fileName="uom_data"
            header="ID,Name,Remarks"
          />
          <Link to={routes.dashboard.createUom} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Satuan
            </Button>
          </Link>
        </div>
      </PageHeader>

      <WidgetCard
        title="Satuan List"
        className={cn('p-0 lg:p-0')}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
        action={
          <Input
            type="search"
            clearable
            inputClassName="h-[36px]"
            placeholder="Search satuan..."
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