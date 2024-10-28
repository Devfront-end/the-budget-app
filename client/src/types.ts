// types.ts
export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}
