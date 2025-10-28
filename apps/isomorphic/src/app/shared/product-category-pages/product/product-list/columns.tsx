'use client';

import DeletePopover from '@core/components/delete-popover';
import { routes } from '@/config/routes';
import { ProductCategory } from '@/kedaimaster-api-handlers/productCategoriesApiHandlers';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<ProductCategory>();

export const productCategoryColumns = [
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Category',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.imageUrl}
        name={row.original.name}
        description={`Created on ${new Date(row.original.createdOn).toLocaleDateString()}`}
        avatarProps={{
          name: row.original.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),
  columnHelper.accessor('createdBy', {
    header: 'Created By',
    cell: ({ row }) => <Text>{row.original.createdBy}</Text>,
  }),
  columnHelper.accessor('updatedOn', {
    header: 'Last Updated',
    cell: ({ row }) => (
      <Text>{new Date(row.original.updatedOn).toLocaleDateString()}</Text>
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 120,
    cell: ({ row, table: { options: { meta } } }) => (
      <Flex align="center" justify="end" gap="3" className="pe-4">
        <Tooltip content="Edit Category" placement="top" color="invert">
          <Link to={routes.dashboard.editCategories(row.original.id)}>
            <ActionIcon as="span" size="sm" variant="outline" aria-label="Edit Category">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title="Delete Category"
          description={`Are you sure you want to delete "${row.original.name}"?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        />
      </Flex>
    ),
  }),
];
