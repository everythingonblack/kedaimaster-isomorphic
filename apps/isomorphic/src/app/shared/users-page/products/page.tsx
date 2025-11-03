"use client";

import { Link } from "react-router-dom";
import {
  PiPlusBold,
  PiMagnifyingGlassBold,
  PiPencilBold,
} from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button } from "rizzui/button";
import usersApiHandlers, {
  User,
} from "@/kedaimaster-api-handlers/usersApiHandlers";
import { useEffect } from "react";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import Table from "@core/components/table";
import TablePagination from "@core/components/table/pagination";
import { Input, ActionIcon, Checkbox, Flex, Text, Tooltip } from "rizzui";
import WidgetCard from "@core/components/cards/widget-card";
import cn from "@core/utils/class-names";
import { createColumnHelper } from "@tanstack/react-table";
import DeletePopover from "@core/components/delete-popover";

const columnHelper = createColumnHelper<User>();

// ✅ Kolom tabel — Email, Role, Action
const userListColumns = [
  // Checkbox Select
  columnHelper.display({
    id: "select",
    size: 50,
    header: ({ table }) => (
      <div className="w-full h-full flex justify-center items-center text-center">
        <Checkbox
          aria-label="Select all rows"
          checked={table.getIsAllPageRowsSelected()}
          onChange={() => table.toggleAllPageRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full h-full flex justify-center items-center text-center">
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onChange={() => row.toggleSelected()}
        />
      </div>
    ),
  }),

  // Email Column
  columnHelper.accessor("email", {
    id: "email",
    size: 300,
    header: "Email",
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.email}</Text>
    ),
  }),

  // Role Column
  columnHelper.accessor("role", {
    id: "role",
    size: 200,
    header: "Role",
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-gray-600">{row.original.role}</Text>
    ),
  }),

  // Action Column
  columnHelper.display({
    id: "action",
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="center" gap="3" className="w-full h-full">
        <Tooltip size="sm" content={"Edit User"} placement="top" color="invert">
          <Link to={routes.dashboard.editUser(row.original.id)}></Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the User`}
          description={`Are you sure you want to delete user "${row.original.email}"?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];

const pageHeader = {
  title: "Users",
  breadcrumb: [
    { href: routes.dashboard.main, name: "Dashboard" },
    { href: routes.dashboard.users, name: "Users" },
    { name: "List" },
  ],
};

export default function UsersPage() {
  const { table, setData } = useTanStackTable<User>({
    tableData: [],
    columnConfig: userListColumns as any,
    options: {
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
      },
      meta: {
        handleDeleteRow: async (row: User) => {
          try {
            await usersApiHandlers.delete(row.id);
            setData((prev) => prev.filter((r) => r.id !== row.id));
            const updatedUsers = await usersApiHandlers.getAll();
            setData(updatedUsers);
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        },
        handleMultipleDelete: async (rows: User[]) => {
          try {
            await Promise.all(
              rows.map((row) => usersApiHandlers.delete(row.id))
            );
            setData((prev) =>
              prev.filter((r) => !rows.some((s) => s.id === r.id))
            );
            const updatedUsers = await usersApiHandlers.getAll();
            setData(updatedUsers);
          } catch (error) {
            console.error("Error deleting multiple users:", error);
          }
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await usersApiHandlers.getAll();
        setData(userData);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, [setData]);

  return (
    <>
      {/* ✅ Header */}
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={table.getRowModel().rows.map((r) => r.original)}
            fileName="user_data"
            header="ID,Email,Role"
          />
          <Link to={routes.dashboard.createUser} className="w-full @lg:w-auto">
            <Button
              as="span"
              className="w-full @lg:w-auto bg-[#2F7F7A] text-white hover:bg-[#276B67]"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add User
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* ✅ Tabel dengan style kayak Excel */}
      <WidgetCard
        title="User List"
        className={cn("p-0 lg:p-0")}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
        action={
          <Input
            type="search"
            clearable
            inputClassName="h-[36px]"
            placeholder="Search user..."
            onClear={() => table.setGlobalFilter("")}
            value={table.getState().globalFilter ?? ""}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
          />
        }
      >
        {/* ✅ Wrapper Excel Style */}
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

        {/* ✅ Pagination */}
        <TablePagination table={table} className="p-4" />
      </WidgetCard>
    </>
  );
}
