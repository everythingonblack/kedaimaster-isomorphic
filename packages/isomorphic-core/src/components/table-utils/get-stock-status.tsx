"use client";

import { Progressbar, Text } from "rizzui";

export function getStockStatus(status: number) {
  if (status === 0) {
    return (
      <div className="flex flex-col max-w-full overflow-hidden">
        <Progressbar value={status} color="danger" className="h-1 w-14" />
        <Text className="pt-1 text-xs text-gray-500">out of stock</Text>
      </div>
    );
  } else if (status <= 20) {
    return (
      <div className="flex flex-col max-w-full overflow-hidden">
        <Progressbar value={status} color="warning" className="h-1 w-14" />
        <Text className="pt-1 text-xs text-gray-500">
          {status} low stock
        </Text>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col max-w-full overflow-hidden">
        <Progressbar value={status} color="success" className="h-1 w-14" />
        <Text className="pt-1 text-xs text-gray-500">
          {status} in stock
        </Text>
      </div>
    );
  }
}