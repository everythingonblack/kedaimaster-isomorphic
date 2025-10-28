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
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Satuan',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.name}</Text>
    ),
  }),
  columnHelper.accessor('remarks', {
    id: 'remarks',
    size: 300,
    header: 'Remarks',
    enableSorting: false,
    cell: ({ row }) => (
      <Text className="text-gray-500">{row.original.remarks || '-'}</Text>
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
        <Tooltip
          size="sm"
          content={'Edit Satuan'}
          placement="top"
          color="invert"
        >
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
          title={`Delete the satuan`}
          description={`Are you sure you want to delete this #${row.original.id} satuan?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];