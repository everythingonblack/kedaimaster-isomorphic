'use client';

import DeletePopover from '@core/components/delete-popover';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';
import { Link } from 'react-router-dom';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import { routes } from '@/config/routes';

type UserType = {
  id: string;
  email: string;
  role: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

const columnHelper = createColumnHelper<UserType>();

export const usersListColumns = [
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
    size: 250,
    cell: ({ row }) => (
      <Text className="font-medium text-gray-800">{row.original.email}</Text>
    ),
  }),
  columnHelper.accessor('role', {
    id: 'role',
    header: 'Role',
    size: 200,
    cell: ({ row }) => (
      <Text className="text-gray-700">{row.original.role}</Text>
    ),
  }),
  columnHelper.accessor('createdOn', {
    id: 'createdOn',
    header: 'Created On',
    size: 180,
    cell: ({ row }) => (
      <Text className="text-gray-600 text-sm">{row.original.createdOn}</Text>
    ),
  }),
  columnHelper.accessor('updatedOn', {
    id: 'updatedOn',
    header: 'Updated On',
    size: 180,
    cell: ({ row }) => (
      <Text className="text-gray-600 text-sm">{row.original.updatedOn}</Text>
    ),
  }),
  columnHelper.display({
    id: 'action',
    header: '',
    size: 100,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content="Edit User"
          placement="top"
          color="invert"
        >
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
        <Tooltip
          size="sm"
          content="View User"
          placement="top"
          color="invert"
        >
          <Link to={routes.dashboard.viewUser(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="View User"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title="Delete User"
          description={`Are you sure you want to delete ${row.original.email}?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
