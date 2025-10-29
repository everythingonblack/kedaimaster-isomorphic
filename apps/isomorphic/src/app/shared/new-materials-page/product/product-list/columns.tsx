'use client';

import DeletePopover from '@core/components/delete-popover';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { getStockStatus } from '@core/components/table-utils/get-stock-status';
import { routes } from '@/config/routes';
import { MaterialType } from '@/kedaimaster-api-handlers/materialApiHandlers';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import { PiArrowsDownUpLight } from 'react-icons/pi';

const columnHelper = createColumnHelper<MaterialType>();

export const materialsListColumns = [
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

  // ✅ Material column
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Material',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.uomImage} // material image
        name={row.original.name}
        description={row.original.uomName} // satuan atau kategori
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

  // ✅ UoM (Satuan)
  columnHelper.accessor('uomName', {
    id: 'uomName',
    size: 150,
    header: ({ column }) => (
      <div
        className="flex items-center justify-center gap-1 cursor-pointer select-none"
        onClick={column.getToggleSortingHandler()}
      >
        <span className="font-medium">Satuan</span>
      </div>
    ),
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.uomName}</Text>
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

  // ✅ Created On — dengan tanggal & waktu
  columnHelper.accessor('createdOn', {
    id: 'createdOn',
    size: 180,
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
          <Text className="font-medium text-gray-500 text-sm">
            {formattedTime}
          </Text>
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
        <Tooltip size="sm" content={'Edit Material'} placement="top" color="invert">
          <Link to={routes.dashboard.editMaterial(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="Edit Material"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the material`}
          description={`Are you sure you want to delete this #${row.original.id} material?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
