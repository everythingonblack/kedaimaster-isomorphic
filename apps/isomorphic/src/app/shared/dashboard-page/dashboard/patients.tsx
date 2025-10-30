'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { Title, Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useCallback, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

const COLORS = ['#2B7F75', '#FFD66B', '#64CCC5', '#176B87', '#e6530fff', '#FF8C42', '#6A0572', '#008891'];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, outerRadius, startAngle, endAngle, midAngle } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 100) * cos;
  const sy = cy + (outerRadius - 100) * sin;
  return (
    <Sector
      cx={sx}
      cy={sy}
      cornerRadius={5}
      innerRadius={50}
      outerRadius={120}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={props.fill}
    />
  );
};

export default function Patients({ className, dashboardData }: { className?: string; dashboardData?: any }) {
  // Ambil data dari dashboardData.current.topProducts
  const topProducts = dashboardData?.current?.topProducts ?? [];
  const totalAll = dashboardData?.current?.totalAll ?? 0;

  // Pie chart data
  const chartData = topProducts.map((item: any) => ({
    name: item.name,
    value: item.total,
    percentage: item.percentage,
  }));

  // Untuk show all
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? chartData : chartData.slice(0, 5);

  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseOver = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);
  const onMouseLeave = useCallback(() => {
    setActiveIndex(0);
  }, []);

  return (
    <WidgetCard className={cn('@container', className)}>
      <div className="h-full items-center gap-4 @sm:flex">
        <div className="relative h-[300px] w-full after:absolute after:inset-1/2 after:h-20 after:w-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-gray-300 @sm:w-3/5 @sm:py-3 rtl:after:translate-x-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cornerRadius={10}
                innerRadius={55}
                outerRadius={100}
                paddingAngle={5}
                stroke="rgba(0,0,0,0)"
                dataKey="value"
                activeShape={renderActiveShape}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              >
                {chartData.map((_item: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="@sm:w-2/5 @sm:ps-2">
          <div className="mb-4 mt-1">
            <div className="mb-1.5 text-gray-700">Total Penjualan</div>
            <Title as="h2" className="font-inter font-bold text-gray-900">
              {totalAll.toLocaleString('id-ID')}
            </Title>
          </div>
          <div>
            {visibleProducts.map((item: any, idx: number) => (
              <Detail
                key={item.name + idx}
                color={COLORS[idx % COLORS.length]}
                value={item.percentage}
                text={item.name}
              />
            ))}
            {chartData.length > 5 && (
              <Button
                size="sm"
                variant="outline"
                className="mt-2 w-full"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? 'Show Less' : 'Show All'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}

function Detail({
  color,
  value,
  text,
}: {
  color: string;
  value: string | number;
  text: string;
}) {
  return (
    <div className="flex justify-between gap-2 border-b border-gray-100 py-3 last:border-b-0">
      <div className="col-span-3 flex items-center justify-start gap-1.5">
        <span style={{ background: color }} className="block h-3 w-3 rounded" />
        <p className="text-gray-500">{text}</p>
      </div>
      <span className="flex items-center">
        <span
          style={{ borderColor: color }}
          className="rounded-full border-2 px-2 font-semibold text-gray-700"
        >
          {value}%
        </span>
      </span>
    </div>
  );
}
