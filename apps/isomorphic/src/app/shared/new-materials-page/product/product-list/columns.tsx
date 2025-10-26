'use client';

import DeletePopover from '@core/components/delete-popover';
import { getRatings } from '@core/components/table-utils/get-ratings';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { getStockStatus } from '@core/components/table-utils/get-stock-status';
import { routes } from '@/config/routes';
import { MaterialType } from '@/kedaimaster-api-handlers/materialApiHandlers';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import {Link} from 'react-router-dom';
import { ActionIcon, Checkbox, Flex, Text, Tooltip } from 'rizzui';

const columnHelper = createColumnHelper<MaterialType>();

export const materialsListColumns = [
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
    header: 'Material',
    enableSorting: false,
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.uomImage} // Assuming uomImage for material image
        name={row.original.name}
        description={row.original.uomName} // Assuming uomName for material category
        avatarProps={{
          name: row.original.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  }),
  columnHelper.accessor('stock', {
    id: 'stock',
    size: 200,
    header: 'Stock',
    cell: ({ row }) => getStockStatus(row.original.stock),
  }),
  columnHelper.accessor('price', { // Assuming price for materials
    id: 'price',
    size: 150,
    header: 'Price',
    cell: ({ row }) => (
      <Text className="font-medium text-gray-700">${row.original.price}</Text>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 120,
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => getStatusBadge(row.original.status),
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
          content={'Edit Material'}
          placement="top"
          color="invert"
        >
          <Link to={routes.dashboard.editMaterial(row.original.id)}> {/* Assuming new route for materials */}
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Material'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Material'}
          placement="top"
          color="invert"
        >
          <Link to={routes.dashboard.materialDetails(row.original.id)}> {/* Assuming new route for materials */}
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Material'}
            >
              <EyeIcon className="h-4 w-4" />
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