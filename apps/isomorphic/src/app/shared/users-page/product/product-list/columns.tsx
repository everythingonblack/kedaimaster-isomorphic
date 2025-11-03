'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Flex, Text, Tooltip, } from 'rizzui';
import DeletePopover from '@core/components/delete-popover';
import { User } from '@/kedaimaster-api-handlers/usersApiHandlers';

const columnHelper = createColumnHelper<User>();

export const userColumns = [
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.email}</Text>
    ),
  }),
  columnHelper.accessor('role', {
    id: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700 capitalize">{row.original.role}</Text>
    ),
  }),
  columnHelper.display({
    id: 'action',
    header: 'Actions',
    size: 120,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip content="Delete User" placement="top" color="invert">
          <DeletePopover
            title="Delete t User"
            description={`Are you sure you want to delete "${row.original.email}"?`}
            onDelete={() => meta?.handleDeleteRow?.(row.original)}
          />
        </Tooltip>
      </Flex>
    ),
  }),
];
