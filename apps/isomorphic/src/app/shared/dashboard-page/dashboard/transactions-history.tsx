'use client';

import WidgetCard from '@core/components/cards/widget-card';
import DropdownAction from '@core/components/charts/dropdown-action';
import DateCell from '@core/ui/date-cell';
import cn from '@core/utils/class-names';
import { PiCalendarBlank, PiCheckBold } from 'react-icons/pi';
import { AdvancedCheckbox, Button } from 'rizzui';
import { useState } from 'react';

const viewOptions = [
  { value: 'All', label: 'All' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Canceled', label: 'Canceled' },
];

export default function TransactionsData({
  className,
  stockInList, // di sini kamu bisa kirim transactionsData dari props
}: {
  className?: string;
  stockInList: any;
}) {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  function handleChange(viewType: string) {
    setFilter(viewType);
  }

  function toggleShowAll() {
    setShowAll((prev) => !prev);
  }

  // Pastikan array valid
  const transactions = Array.isArray(stockInList) ? stockInList : [];

  // Filter berdasarkan status paid/canceled
  const filteredTransactions =
    filter === 'All'
      ? transactions
      : filter === 'Paid'
      ? transactions.filter((t) => t.paid && !t.canceled)
      : filter === 'Unpaid'
      ? transactions.filter((t) => !t.paid && !t.canceled)
      : transactions.filter((t) => t.canceled);

  const displayedTransactions = showAll
    ? filteredTransactions
    : filteredTransactions.slice(0, 3);

  return (
    <WidgetCard
      title="Daftar Transaksi"
      titleClassName="text-gray-800 sm:text-lg font-inter"
      headerClassName="items-center"
      className={cn('overflow-hidden bg-gray-50 @container', className)}
      action={
        <DropdownAction
          className="rounded-lg border"
          options={viewOptions}
          onChange={handleChange}
          selectClassName="min-w-[120px]"
          prefixIconClassName="hidden"
          dropdownClassName="!z-[11]"
        />
      }
    >
<div
  className={cn(
    'relative mt-7 transition-all duration-300',
    showAll ? 'h-[80vh]' : 'h-[22rem]'
  )}
>
        <div className="custom-scrollbar relative -mx-3 -my-2 h-full w-[calc(100%+24px)] overflow-y-auto pb-24">
          <div className="relative before:absolute before:start-9 before:top-3 before:z-0 before:h-[calc(100%-24px)] before:w-1 before:translate-x-0.5 before:bg-gray-200">
            {displayedTransactions.map((trx) => (
              <AdvancedCheckbox
                name="transactionItem"
                value={trx.id}
                key={trx.id}
                className="relative z-10 mt-0.5 px-3 py-1.5"
                inputClassName="[&:checked~.rizzui-advanced-checkbox]:ring-muted [&:checked~.rizzui-advanced-checkbox>span>svg]:opacity-100 [&:checked~.rizzui-advanced-checkbox>span]:border-[#2B7F75]"
                contentClassName="flex w-full bg-gray-0 dark:bg-gray-50 items-start @md:px-5 px-4 py-4 rounded-lg shadow hover:shadow-md transition-shadow border-0 @md:gap-5 gap-4"
              >
                {/* Checkbox icon */}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#D9B34E]">
                  <PiCheckBold className="fill-[#2B7F75] opacity-0" />
                </span>

                {/* Transaction Info */}
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <strong className="font-semibold text-gray-900">
                      {trx.customerName || 'Tanpa Nama'}
                    </strong>
                    <span
                      className={`inline-block rounded-2xl px-2.5 text-xs font-medium text-white ${
                        trx.canceled
                          ? 'bg-red-500'
                          : trx.paid
                          ? 'bg-green-600'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {trx.canceled
                        ? 'Canceled'
                        : trx.paid
                        ? 'Paid'
                        : 'Unpaid'}
                    </span>
                  </div>

                  {/* Phone */}
                  {trx.customerPhone && (
                    <div className="text-sm text-gray-500">
                      📞 {trx.customerPhone}
                    </div>
                  )}

                  {/* Total */}
                  <div className="text-gray-800 text-sm font-semibold">
                    Total:{' '}
                    {trx.total.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </div>

                  {/* Detail produk */}
                  <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                    {trx.transactionDetails.map((detail: any, i: number) => (
                      <li key={i}>
                        {detail.product.name} × {detail.qty} @{' '}
                        {detail.unitPrice.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </li>
                    ))}
                  </ul>

                  {/* Waktu */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                    <PiCalendarBlank className="shrink-0 text-base text-gray-400" />
                    <DateCell
                      //@ts-ignore
                      date={trx.createdOn}
                      dateClassName="font-normal text-gray-500"
                      className="flex gap-2"
                      timeClassName="text-sm"
                      dateFormat="M/D/YYYY"
                    />
                  </div>
                </div>
              </AdvancedCheckbox>
            ))}
          </div>
        </div>

        {/* Tombol Show More / Less */}
        {filteredTransactions.length > 3 && (
          <div className="absolute -start-0.5 bottom-0 z-20 flex h-32 w-[101%] items-end justify-center bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
            <Button
              rounded="lg"
              className="bg-gray-0 text-gray-800 shadow-md transition-shadow hover:bg-gray-0 hover:shadow dark:hover:bg-gray-0"
              onClick={toggleShowAll}
            >
              {showAll ? 'Show Less' : 'Show All'}
            </Button>
          </div>
        )}
      </div>
    </WidgetCard>
  );
}
