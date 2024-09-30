export interface ExpenseItem {
  description: string;
  amount: number;
  date: string;
  type: 'groceries' | 'rent' | 'dining' | 'transportation' | 'utilities' | 'income' | 'expense';
}