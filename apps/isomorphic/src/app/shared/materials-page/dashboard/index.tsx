
import StockReport from '@/app/shared/materials-page/dashboard/stock-report';

export default function EcommerceDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
<StockReport className="@4xl:col-span-2 @7xl:col-span-12 @[90rem]:col-span-7 @[112rem]:col-span-8 h-full" />
      </div>
    </div>
  );
}
