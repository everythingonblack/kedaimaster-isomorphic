'use client';

import DeletePopover from '@core/components/delete-popover';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { getStockStatus } from '@core/components/table-utils/get-stock-status';
import { routes } from '@/config/routes';
import { ProductType } from '@/kedaimaster-api-handlers/productApiHandlers';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import { PiArrowsDownUpLight } from 'react-icons/pi';

const columnHelper = createColumnHelper<ProductType>();

export const productsListColumns = [
  // ✅ Checkbox Select
  columnHelper.display({
  id: 'select',
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


  // ✅ Product column
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Product',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.image}
        name={row.original.name}
        description={row.original.category}
        avatarProps={{
          name: row.original.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),

  // ✅ Stock column — pakai ikon ↑↓
  columnHelper.accessor('stock', {
    id: 'stock',
    size: 200,
    header: ({ column }) => (
      <div
        className="flex items-center justify-center gap-1 cursor-pointer select-none"
        onClick={column.getToggleSortingHandler()}
      >
        <span className="font-medium">Stock</span>
      </div>
    ),
    cell: ({ row }) => getStockStatus(row.original.stock),
  }),

  // ✅ Price column — pakai ikon ↑↓
  columnHelper.accessor('price', {
    id: 'price',
    size: 150,
    header: ({ column }) => (
      <div
        className="flex items-center justify-center gap-1 cursor-pointer select-none"
        onClick={column.getToggleSortingHandler()}
      >
        <span className="font-medium">Price</span>
      </div>
    ),
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">Rp{row.original.price}</Text>
    ),
  }),

  // ✅ Status
  columnHelper.accessor('status', {
    id: 'status',
    size: 120,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
  }),

  // ✅ Created By
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    size: 150,
    header: 'Created By',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.createdBy}</Text>
    ),
  }),

  // ✅ Created On
columnHelper.accessor('createdOn', {
  id: 'createdOn',
  size: 120,
  enableSorting: false,
  header: () => (
    <div className="w-full h-full flex justify-center items-center text-center">
      Created On
    </div>
  ),
  cell: ({ row }) => {
    const createdOn = row.original.createdOn;
    if (!createdOn) return null;

    const date = new Date(createdOn);
    const formattedDate = date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <Text className="font-medium text-gray-700">{formattedDate}</Text>
        <Text className="font-medium text-gray-500 text-sm">{formattedTime}</Text>
      </div>
    );
  },
}),

  // ✅ Action column
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="center" gap="3" className="w-full h-full">
  <Tooltip size="sm" content={'Edit Product'} placement="top" color="invert">
    <Link to={routes.dashboard.editProduct(row.original.id)}>
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label="Edit Product"
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Link>
  </Tooltip>
  <DeletePopover
    title={`Delete the product`}
    description={`Are you sure you want to delete "${row.original.name}"?`}
    onDelete={() =>
      meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
    }
  />
</Flex>

    ),
  }),
];

