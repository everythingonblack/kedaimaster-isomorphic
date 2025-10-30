import { Link } from "react-router-dom";
import { PiPlusBold, PiMagnifyingGlassBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button } from "rizzui/button";
import {
  deleteMaterial,
  fetchMaterials,
  MaterialType,
} from "@/kedaimaster-api-handlers/materialApiHandlers";
import { useEffect } from "react";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { materialsListColumns } from "@/app/shared/new-materials-page/product/product-list/columns";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import { Input } from "rizzui";
import WidgetCard from "@core/components/cards/widget-card";
import cn from "@core/utils/class-names";

const pageHeader = {
  title: "Materials",
  breadcrumb: [
    { href: routes.dashboard.main, name: "E-Commerce" },
    { href: routes.dashboard.material, name: "Materials" },
    { name: "List" },
  ],
};

export default function MaterialsPage() {
  const { table, setData } = useTanStackTable<MaterialType>({
    tableData: [],
    columnConfig: materialsListColumns as any,
    options: {
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
      },
      meta: {
        handleDeleteRow: async (row: MaterialType) => {
          try {
            await deleteMaterial(row.id);
            setData((prev) => prev.filter((r) => r.id !== row.id));
            const updatedMaterials = await fetchMaterials();
            setData(updatedMaterials);
          } catch (error) {
            console.error("Error deleting material:", error);
          }
        },
        handleMultipleDelete: async (rows: MaterialType[]) => {
          try {
            await Promise.all(rows.map((row) => deleteMaterial(row.id)));
            setData((prev) =>
              prev.filter((r) => !rows.some((s) => s.id === r.id))
            );
            const updatedMaterials = await fetchMaterials();
            setData(updatedMaterials);
          } catch (error) {
            console.error("Error deleting multiple materials:", error);
          }
        },
      },
      enableColumnResizing: false,
    },
  });

  // ambil data materials
  useEffect(() => {
    const getMaterials = async () => {
      try {
        const materialData = await fetchMaterials();
        console.log("Fetched materials:", materialData);
        setData(materialData);
      } catch (err) {
        console.error("Error fetching materials:", err);
      }
    };
    getMaterials();
  }, [setData]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={table.getRowModel().rows.map((r) => r.original)}
            fileName="material_data"
            header="ID,Name,Category,Material Thumbnail,SKU,Stock,Price,Status"
          />
          <Link
            to={routes.dashboard.createMaterial}
            className="w-full @lg:w-auto"
          >
            <Button
              as="span"
              className="w-full @lg:w-auto bg-[#2F7F7A] text-white hover:bg-[#276B67]"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Material
            </Button>
          </Link>
        </div>
      </PageHeader>

      <WidgetCard
        title="Material List"
        className={cn("p-0 lg:p-0")}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
        action={
          <Input
            type="search"
            clearable
            inputClassName="h-[36px]"
            placeholder="Search material..."
            onClear={() => table.setGlobalFilter("")}
            value={table.getState().globalFilter ?? ""}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
          />
        }
      >
        {/* ✅ Wrapper untuk tampilan tabel bergaya Excel */}
        <div className="overflow-x-auto border border-gray-300 rounded-md shadow-sm">
          <Table
            table={table}
            variant="modern"
            classNames={{
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
