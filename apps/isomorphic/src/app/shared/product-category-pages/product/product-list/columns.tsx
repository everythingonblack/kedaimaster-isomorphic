'use client';

import DeletePopover from '@core/components/delete-popover';
import { routes } from '@/config/routes';
import { ProductCategory } from '@/kedaimaster-api-handlers/productCategoriesApiHandlers';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<ProductCategory>();

export const productCategoryColumns = [
  // ✅ Checkbox Select Column
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

  // ✅ Category Column
  columnHelper.accessor('name', {
    id: 'name',
    size: 300,
    header: 'Category',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.imageUrl}
        name={row.original.name}
        avatarProps={{
          name: row.original.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),

  // ✅ Created By
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    size: 180,
    header: 'Created By',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">{row.original.createdBy}</Text>
    ),
  }),

  // ✅ Created On (tanggal + jam)
  columnHelper.accessor('createdOn', {
    id: 'createdOn',
    size: 180,
    header: 'Created On',
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

  // ✅ Updated On (tanggal + jam)
  columnHelper.accessor('updatedOn', {
    id: 'updatedOn',
    size: 180,
    header: 'Last Updated',
    cell: ({ row }) => {
      const updatedOn = row.original.updatedOn;
      if (!updatedOn) return null;

      const date = new Date(updatedOn);
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

  // ✅ Actions Column
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
          content="Edit Category"
          placement="top"
          color="invert"
        >
          <Link to={routes.dashboard.editCategories(row.original.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label="Edit Category"
            >
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
