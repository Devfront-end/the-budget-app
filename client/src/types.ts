export interface ExpenseItem {
  id: string;
  amount: number;
  date: string;
  type: string; // Add this line
  description: string;
}