import dayjs from 'dayjs';
import { getDashboard, getDashboardAggregate } from '@/kedaimaster-api/dashboardApi';

// =======================
// 🧩 Type Definitions
// =======================

export interface ProductData {
  id: string;
  name: string;
  imageUrl: string | null;
  total: number;
  percentage?: string | number;
  [key: string]: any;
}

export interface MaterialData {
  id: string;
  name: string;
  stock: number;
}

export interface StockInListData {
  id: string;
  material: MaterialData;
  type: string;
  qty: number;
  unitPrice: number;
  amount: number;
  createdBy: string;
  createdOn: string;
}

export interface FullDashboardResponse {
  income: number;
  outcome: number;
  transaction: number;
  topProducts: ProductData[];
  topProductPrevious: ProductData[];
  topProduct: ProductData | null;
  stockInList: StockInListData[];
  customerInitiatedTransaction: number;
  cashierInitiatedTransaction: number;
  incomeGrowth: number;
  outcomeGrowth: number;
  transactionGrowth: number;
}

export interface DashboardData {
  income?: number;
  outcome?: number;
  transaction?: number;
  topProducts?: ProductData[];
  topProduct?: ProductData | null;
  totalAll?: number;
  stockInList?: StockInListData[];
  customerInitiatedTransaction?: number;
  cashierInitiatedTransaction?: number;
  incomeGrowth?: number;
  outcomeGrowth?: number;
  transactionGrowth?: number;
  [key: string]: any;
}

export interface AggregateData {
  time?: string;
  totalAmount: number;
  percentage?: string | number;
  [key: string]: any;
}

export interface DateRanges {
  startDate: string;
  endDate: string;
  nowStart: string;
  nowEnd: string;
  cmpStart: string;
  cmpEnd: string;
}

// =======================
// 📅 Helper: Hitung tanggal pembanding
// =======================

export function getDateRanges(startDate: string, endDate: string, type?: string): DateRanges {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  let nowStart: string = startDate;
  let nowEnd: string = endDate;
  let cmpStart: string = startDate;
  let cmpEnd: string = endDate;

  if (!type) {
    // Kustom: geser mundur sama panjang periode
    const days = end.diff(start, 'day') + 1;
    cmpStart = start.subtract(days, 'day').format('YYYY-MM-DD');
    cmpEnd = start.subtract(1, 'day').format('YYYY-MM-DD');
  } else {
    switch (type) {
      case 'harian':
        nowStart = startDate;
        nowEnd = startDate;
        cmpStart = cmpStart;
        cmpEnd = cmpStart;
        break;
      case 'mingguan':
        nowStart = startDate;
        nowEnd = endDate;
        cmpStart = start.startOf('week').subtract(1, 'week').format('YYYY-MM-DD');
        cmpEnd = start.endOf('week').subtract(1, 'week').format('YYYY-MM-DD');
        break;
      case 'bulanan':
        nowStart = startDate;
        nowEnd = endDate;
        cmpStart = start.startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
        cmpEnd = start.endOf('month').subtract(1, 'month').format('YYYY-MM-DD');
        break;
      case 'tahunan':
        nowStart = startDate;
        nowEnd = endDate;
        cmpStart = start.startOf('year').subtract(1, 'year').format('YYYY-MM-DD');
        cmpEnd = start.endOf('year').subtract(1, 'year').format('YYYY-MM-DD');
        break;
    }
  }

  return { startDate, endDate, nowStart, nowEnd, cmpStart, cmpEnd };
}

// =======================
// 📊 Main Dashboard Data
// =======================


export async function handleDashboardData(
  startDate: string,
  endDate: string,
  type?: string
) {
  try {
    console.log(startDate,endDate)
    // langsung panggil backend sekali, semua sudah termasuk comparison
    const data = await getDashboard(startDate, endDate);
    return data; // return langsung semua respon
  } catch (error) {
    console.error('❌ Error handleDashboardData:', error);
    throw error;
  }
}

// =======================
// 🕓 Aggregate Data
// =======================

export async function handleDashboardAggregate(
  nowStart: string,
  nowEnd: string,
  cmpStart: string,
  cmpEnd: string,
  type?: string,
  intervalHour: number = 2
): Promise<{ current: AggregateData[]; comparison: AggregateData[] }> {
  try {
    // === Data utama ===
    const data: AggregateData[] = await getDashboardAggregate(nowStart, nowEnd, type, intervalHour);

    const totalAmount = data.reduce((sum, d) => sum + (d.totalAmount || 0), 0);
    const currentData = data.map((item) => ({
      ...item,
      percentage: totalAmount > 0 ? ((item.totalAmount / totalAmount) * 100).toFixed(2) : 0,
    }));

    // === Data pembanding ===
    const cmpDataRaw: AggregateData[] = await getDashboardAggregate(cmpStart, cmpEnd, type, intervalHour);

    const cmpTotalAmount = cmpDataRaw.reduce((sum, d) => sum + (d.totalAmount || 0), 0);
    const comparisonData = cmpDataRaw.map((item) => ({
      ...item,
      percentage: cmpTotalAmount > 0 ? ((item.totalAmount / cmpTotalAmount) * 100).toFixed(2) : 0,
    }));

    return { current: currentData, comparison: comparisonData };
  } catch (error) {
    console.error('❌ Error handleDashboardAggregate:', error);
    throw error;
  }
}

// =======================
// 📈 Transaction Graph
// =======================

export interface TransactionGraphPoint {
  label: string;
  transaction: number;
  dateRange: { start: string; end: string };
}

export interface TransactionGraphResult {
  current: TransactionGraphPoint[];
  comparison: TransactionGraphPoint[];
  growthTransaction?: number;
}

export async function getTransactionGraph(
  startDate: string,
  endDate: string,
  type?: 'harian' | 'mingguan' | 'bulanan'
): Promise<TransactionGraphResult> {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
console.log(type)
  let current: TransactionGraphPoint[] = [];
  let comparison: TransactionGraphPoint[] = [];

  // if (type === 'harian') {
  //   // 7 hari terakhir
  //   for (let i = 6; i >= 0; i--) {
  //     const d = end.subtract(i, 'day');
  //     const dateStr = d.format('YYYY-MM-DD');
  //     const data = await getDashboard(dateStr, dateStr);
  //     current.push({
  //       label: dateStr,
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: dateStr, end: dateStr },
  //     });
  //   }
  //   // Comparison: 7 hari sebelum periode current
  //   for (let i = 6; i >= 0; i--) {
  //     const d = end.subtract(7 + i, 'day');
  //     const dateStr = d.format('YYYY-MM-DD');
  //     const data = await getDashboard(dateStr, dateStr);
  //     comparison.push({
  //       label: dateStr,
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: dateStr, end: dateStr },
  //     });
  //   }
  // } else if (type === 'mingguan') {
  //   // 4 minggu terakhir
  //   for (let i = 3; i >= 0; i--) {
  //     const weekStart = end.subtract(i, 'week').startOf('week');
  //     const weekEnd = end.subtract(i, 'week').endOf('week');
  //     const s = weekStart.format('YYYY-MM-DD');
  //     const e = weekEnd.format('YYYY-MM-DD');
  //     const data = await getDashboard(s, e);
  //     current.push({
  //       label: `${s} - ${e}`,
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: s, end: e },
  //     });
  //   }
  //   // Comparison: 4 minggu sebelum current
  //   for (let i = 3; i >= 0; i--) {
  //     const weekStart = end.subtract(4 + i, 'week').startOf('week');
  //     const weekEnd = end.subtract(4 + i, 'week').endOf('week');
  //     const s = weekStart.format('YYYY-MM-DD');
  //     const e = weekEnd.format('YYYY-MM-DD');
  //     const data = await getDashboard(s, e);
  //     comparison.push({
  //       label: `${s} - ${e}`,
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: s, end: e },
  //     });
  //   }
  // } else if (type === 'bulanan') {
  //   // 12 bulan terakhir
  //   for (let i = 11; i >= 0; i--) {
  //     const month = end.subtract(i, 'month');
  //     const s = month.startOf('month').format('YYYY-MM-DD');
  //     const e = month.endOf('month').format('YYYY-MM-DD');
  //     const data = await getDashboard(s, e);
  //     current.push({
  //       label: month.format('MMM YYYY'),
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: s, end: e },
  //     });
  //   }
  //   // Comparison: 12 bulan sebelum current
  //   for (let i = 11; i >= 0; i--) {
  //     const month = end.subtract(12 + i, 'month');
  //     const s = month.startOf('month').format('YYYY-MM-DD');
  //     const e = month.endOf('month').format('YYYY-MM-DD');
  //     const data = await getDashboard(s, e);
  //     comparison.push({
  //       label: month.format('MMM YYYY'),
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: s, end: e },
  //     });
  //   }
  // } else {
  //   // Custom: loop sebanyak jumlah hari antara startDate dan endDate
  //   const days = end.diff(start, 'day') + 1;
  //   for (let i = 0; i < days; i++) {
  //     const d = start.add(i, 'day');
  //     const dateStr = d.format('YYYY-MM-DD');
  //     const data = await getDashboard(dateStr, dateStr);
  //     current.push({
  //       label: dateStr,
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: dateStr, end: dateStr },
  //     });
  //   }
  //   // Comparison: periode sebelum current, sama panjang
  //   for (let i = 0; i < days; i++) {
  //     const d = start.subtract(days, 'day').add(i, 'day');
  //     const dateStr = d.format('YYYY-MM-DD');
  //     const data = await getDashboard(dateStr, dateStr);
  //     comparison.push({
  //       label: dateStr,
  //       transaction: data.transaction ?? 0,
  //       dateRange: { start: dateStr, end: dateStr },
  //     });
  //   }
  // }

  // Hitung growth transaksi antara 2 titik terakhir current
  let growthTransaction: number | undefined = undefined;
  if (current.length >= 2) {
    const last = current[current.length - 1].transaction;
    const prev = current[current.length - 2].transaction;
    if (prev !== 0) {
      growthTransaction = ((last - prev) / Math.abs(prev)) * 100;
    }
  }
  console.log('Current Transaction Data:', current);
  console.log('Comparison Transaction Data:', comparison);
  console.log('Growth Transaction:', growthTransaction);
  return {
    current,
    comparison,
    growthTransaction,
  };
}
