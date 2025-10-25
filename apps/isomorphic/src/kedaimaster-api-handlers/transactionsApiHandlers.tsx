// apps/isomorphic/src/kedaimaster-api-handlers/transactionsApiHandlers.tsx

import { createTransaction, getTransactionById, getTransactionsByDateRange } from '@/kedaimaster-api/transactionsApi';

// Define the types based on the transactionsApi.js
export type TransactionItem = { productId: string; qty: number; unitPrice: number; };
export type CreateTransactionRequest = { deviceTime: string; paymentType: string; servingType: string; notes?: string; customerName?: string; customerPhone?: string; items: TransactionItem[]; };
export type Transaction = { id: string; deviceTime: string; paymentType: string; servingType: string; notes?: string; customerName?: string; customerPhone?: string; items: TransactionItem[]; };

const transactionsApiHandlers = {
  async create(transactionData: CreateTransactionRequest): Promise<Transaction> {
    try {
      return await createTransaction(transactionData) as Transaction;
    } catch (error) {
      console.error("Failed to create transaction:", error);
      throw error;
    }
  },
  async getById(id: string): Promise<Transaction> {
    try {
      const response = await getTransactionById(id);
      return response as Transaction;
    } catch (error) {
      console.error("Failed to get transaction by id:", error);
      throw error;
    }
  },
  async getByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    try {
      const response = await getTransactionsByDateRange(startDate, endDate);
      return response as Transaction[];
    } catch (error) {
      console.error("Failed to get transactions by date range:", error);
      throw error;
    }
  },
};

export default transactionsApiHandlers;