import { getDashboard, getDashboardAggregate } from '@/kedaimaster-api/dashboardApi';

// =======================
// 🧩 Type Definitions
// =======================

export interface ProductData {
  id: string;
  name: string;
  total: number;
  percentage?: string | number;
  [key: string]: any;
}

export interface DashboardData {
  topProducts?: ProductData[];
  topProduct?: ProductData | null;
  totalAll?: number;
  [key: string]: any;
}

export interface AggregateData {
  time?: string;
  totalAmount: number;
  percentage?: string | number;
  [key: string]: any;
}

// =======================
// 📊 Main Dashboard Data
// =======================

/**
 * Handler untuk memanggil API dashboard utama
 * dan menambahkan persentase kontribusi tiap produk.
 *
 * @param startDate - format YYYY-MM-DD
 * @param endDate - format YYYY-MM-DD
 * @returns Promise<DashboardData>
 */
export async function handleDashboardData(
  startDate: string,
  endDate: string
): Promise<DashboardData> {
  try {
    const data: DashboardData = await getDashboard(startDate, endDate);

    if (!data || !data.topProducts) return data;

    const totalAll = data.topProducts.reduce(
      (sum, p) => sum + (p.total || 0),
      0
    );

    const topProductsWithPercent = data.topProducts.map((p) => ({
      ...p,
      percentage: totalAll > 0 ? ((p.total / totalAll) * 100).toFixed(2) : 0,
    }));

    const topProduct = data.topProduct
      ? {
          ...data.topProduct,
          percentage:
            totalAll > 0
              ? ((data.topProduct.total / totalAll) * 100).toFixed(2)
              : 0,
        }
      : null;

    return {
      ...data,
      topProducts: topProductsWithPercent,
      topProduct,
      totalAll,
    };
  } catch (error) {
    console.error('❌ Error handleDashboardData:', error);
    throw error;
  }
}

// =======================
// 🕓 Aggregate Data
// =======================

/**
 * Handler untuk memanggil API dashboard aggregate
 * berdasarkan tanggal dan interval jam.
 *
 * @param date - format YYYY-MM-DD
 * @param intervalHour - interval jam (default 2)
 * @returns Promise<AggregateData[]>
 */
export async function handleDashboardAggregate(
  date: string,
  intervalHour: number
): Promise<AggregateData[]> {
  try {
    const data: AggregateData[] = await getDashboardAggregate(
      date,
      intervalHour
    );

    if (!Array.isArray(data)) return [];

    const totalAmount = data.reduce(
      (sum, d) => sum + (d.totalAmount || 0),
      0
    );

    return data.map((item) => ({
      ...item,
      percentage:
        totalAmount > 0
          ? ((item.totalAmount / totalAmount) * 100).toFixed(2)
          : 0,
    }));
  } catch (error) {
    console.error('❌ Error handleDashboardAggregate:', error);
    throw error;
  }
}
