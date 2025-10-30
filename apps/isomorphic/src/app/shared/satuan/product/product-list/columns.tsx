'use client';

import DeletePopover from '@core/components/delete-popover';
import { routes } from '@/config/routes';
import { Uom } from '@/kedaimaster-api-handlers/uomApiHandlers';
import PencilIcon from '@core/components/icons/pencil';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<Uom>();

export const uomListColumns = [
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

  // ✅ Satuan (Name)
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Satuan',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.name}</Text>
    ),
  }),

  // ✅ Remarks
  columnHelper.accessor('remarks', {
    id: 'remarks',
    size: 300,
    header: 'Remarks',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-gray-500">{row.original.remarks || '-'}</Text>
    ),
  }),

  // ✅ Created By
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    size: 180,
    enableSorting: false,
    header: () => (
      <div className="w-full h-full flex justify-center items-center text-center">
        Created By
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full h-full flex justify-center items-center text-center">
        <Text className="font-medium text-gray-700">
          {row.original.createdBy || '-'}
        </Text>
      </div>
    ),
  }),

  // ✅ Created On
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
        <Tooltip size="sm" content={'Edit Satuan'} placement="top" color="invert">
          <Link to={routes.dashboard.editUom(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Satuan'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete Satuan`}
          description={`Are you sure you want to delete "${row.original.name}"?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
