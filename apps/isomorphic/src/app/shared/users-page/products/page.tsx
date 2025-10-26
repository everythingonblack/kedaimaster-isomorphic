import { Link } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import usersApiHandlers, { User } from '@/kedaimaster-api-handlers/usersApiHandlers';
import { useEffect } from 'react';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import Table from '@core/components/table';
import TablePagination from '@core/components/table/pagination';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import WidgetCard from '@core/components/cards/widget-card';
import cn from '@core/utils/class-names';

// Kolom untuk tabel user
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<User>();

const userListColumns = [
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => <Text>{row.original.email}</Text>,
  }),
  columnHelper.accessor('role', {
    id: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Text className="capitalize">{row.original.role.replace('_', ' ').toLowerCase()}</Text>
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <Link to={routes.dashboard.editUser(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit User'}
            >
              <PiPlusBold className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the user`}
          description={`Are you sure you want to delete user ${row.original.email}?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];

const pageHeader = {
  title: 'Users',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'Dashboard' },
    { href: routes.dashboard.users, name: 'Users' },
    { name: 'List' },
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
            // Optionally refetch all users to ensure data consistency
            const updatedUsers = await usersApiHandlers.getAll();
            setData(updatedUsers);
          } catch (error) {
            // Handle error, e.g., show a toast notification
            console.error('Error deleting user:', error);
          }
        },
        handleMultipleDelete: async (rows: User[]) => {
          try {
            await Promise.all(rows.map((row) => usersApiHandlers.delete(row.id)));
            setData((prev) => prev.filter((r) => !rows.some((s) => s.id === r.id)));
            // Optionally refetch all users to ensure data consistency
            const updatedUsers = await usersApiHandlers.getAll();
            setData(updatedUsers);
          } catch (error) {
            // Handle error, e.g., show a toast notification
            console.error('Error deleting multiple users:', error);
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
        console.error('Error fetching users:', err);
      }
    };
    getUsers();
  }, [setData]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={table.getRowModel().rows.map((r) => r.original)}
            fileName="user_data"
            header="ID,Email,Role"
          />
          <Link to={routes.dashboard.createUser} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add User
            </Button>
          </Link>
        </div>
      </PageHeader>

      <WidgetCard
        title="User List"
        className={cn('p-0 lg:p-0')}
        headerClassName="mb-6 px-5 pt-5 lg:px-7 lg:pt-7"
        action={
          <Input
            type="search"
            clearable
            inputClassName="h-[36px]"
            placeholder="Search user..."
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

// Komponen DeletePopover bisa pakai yang sama seperti produk
import DeletePopover from '@core/components/delete-popover';