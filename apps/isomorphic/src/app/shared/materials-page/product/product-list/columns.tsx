'use client';

import DeletePopover from '@core/components/delete-popover';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { MaterialType } from '@/kedaimaster-api-handlers/materialApiHandlers';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';
import { PiPencilSimpleLine, PiEyeBold } from 'react-icons/pi';

const columnHelper = createColumnHelper<MaterialType>();

export const materialsListColumns = [
  // Checkbox untuk select row
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

  // Kolom Nama + Gambar (UOM Image)
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Material',
    size: 300,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.uom?.imageUrl}
        name={row.original.name}
        description={row.original.remarks}
        avatarProps={{
          name: row.original.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),

  // Kolom Satuan (UOM)
  columnHelper.accessor('uom.name', {
    id: 'uom',
    header: 'Unit',
    size: 100,
    cell: ({ row }) => (
      <Text className="text-gray-700 font-medium">{row.original.uom?.name}</Text>
    ),
  }),

  // Kolom Stok
  columnHelper.accessor('stock', {
    id: 'stock',
    header: 'Stock',
    size: 100,
    cell: ({ row }) => (
      <Text className="text-gray-800 font-semibold">{row.original.stock}</Text>
    ),
  }),

  // Kolom Tanggal Update
  columnHelper.accessor('updatedOn', {
    id: 'updatedOn',
    header: 'Last Updated',
    size: 180,
    cell: ({ row }) => (
      <Text className="text-gray-600 text-sm">{row.original.updatedOn}</Text>
    ),
  }),

  // Kolom Aksi
  columnHelper.display({
    id: 'action',
    size: 120,
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip content="Edit Material" placement="top">
          <ActionIcon
            as="button"
            size="sm"
            variant="outline"
            aria-label="Edit Material"
          >
            <PiPencilSimpleLine className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip content="View Material" placement="top">
          <ActionIcon
            as="button"
            size="sm"
            variant="outline"
            aria-label="View Material"
          >
            <PiEyeBold className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete Material`}
          description={`Are you sure you want to delete ${row.original.name}?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
