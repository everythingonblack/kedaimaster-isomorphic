'use client';

import DeletePopover from '@core/components/delete-popover';
import { routes } from '@/config/routes';
import { User } from '@/kedaimaster-api-handlers/usersApiHandlers';
import PencilIcon from '@core/components/icons/pencil';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<User>();

export const userListColumns = [
  // ✅ Checkbox
  columnHelper.display({
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <div className="w-full flex justify-center items-center">
        <Checkbox
          aria-label="Select all rows"
          checked={table.getIsAllPageRowsSelected()}
          onChange={() => table.toggleAllPageRowsSelected()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full flex justify-center items-center">
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onChange={() => row.toggleSelected()}
        />
      </div>
    ),
  }),

  // ✅ Email Column
  columnHelper.accessor('email', {
    id: 'email',
    size: 400,
    header: () => (
      <div className="w-full flex justify-center items-center text-center font-semibold text-gray-800">
        Email
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full flex justify-center items-center text-center">
        <Text className="font-medium text-gray-700">{row.original.email}</Text>
      </div>
    ),
  }),

  // ✅ Role Column
  columnHelper.accessor('role', {
    id: 'role',
    size: 250,
    header: () => (
      <div className="w-full flex justify-center items-center text-center font-semibold text-gray-800">
        Role
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full flex justify-center items-center text-center">
        <Text className="capitalize font-medium text-gray-700">
          {row.original.role.replace('_', ' ').toLowerCase()}
        </Text>
      </div>
    ),
  }),

  // ✅ Action Column
  columnHelper.display({
    id: 'action',
    size: 120,
    header: () => (
      <div className="w-full flex justify-center items-center text-center font-semibold text-gray-800">
        Action
      </div>
    ),
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="center" gap="3" className="w-full h-full">
        <Tooltip size="sm" content="Edit User" placement="top" color="invert">
          <Link to={routes.dashboard.editUser(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="Edit User"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title="Delete User"
          description={`Are you sure you want to delete user ${row.original.email}?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
