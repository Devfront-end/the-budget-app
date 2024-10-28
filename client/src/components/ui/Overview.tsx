import React from 'react';
import { Card } from './card';
import { ExpenseItem } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface OverviewProps {
  isDarkTheme: boolean;
  income: ExpenseItem[];
  expenses: ExpenseItem[];
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

interface MonthData {
  month: string;
  expenses: number;
  revenus: number;
  isCurrentMonth: boolean;
}

interface ExpenseCategory {
  icon: string;
  name: string;
  amount: number;
}

const Overview: React.FC<OverviewProps> = ({
  isDarkTheme,
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth
}) => {
  const getMonthName = (month: number): string => {
    return new Date(2024, month).toLocaleString('fr-FR', { month: 'long' });
  };

  const getLast6Months = (): MonthData[] => {
    const months: MonthData[] = [];
    for (let i = 5; i >= 0; i--) {
      let monthIndex = currentMonth - i;

      if (monthIndex < 0) {
        monthIndex += 12;
      }

      months.push({
        month: getMonthName(monthIndex),
        expenses: -1240.89,
        revenus: 1246.50,
        isCurrentMonth: i === 0
      });
    }
    return months;
  };

  const expenseCategories: ExpenseCategory[] = [
    { icon: '🏠', name: 'Logement & Charges', amount: -480.98 },
    { icon: '🛒', name: 'Courses & Alimentation', amount: -273.76 },
    { icon: '💻', name: 'Multimédia & Electronique', amount: -224.30 },
    { icon: '🚗', name: 'Transport & Voiture', amount: -71.77 },
    { icon: '💳', name: 'Retrait', amount: -50.00 },
    { icon: '💰', name: 'Cash26', amount: -50.00 },
    { icon: '📌', name: 'Autres', amount: -43.10 },
    { icon: '🔒', name: 'Assurance & Finances', amount: -32.07 },
    { icon: '📱', name: 'Abonnements & Donations', amount: -9.91 },
    { icon: '🎮', name: 'Loisirs & Divertissement', amount: -5.00 }
  ];

  const monthlyData = getLast6Months();

  const formattedMonth = new Date(currentYear, currentMonth).toLocaleString('fr-FR', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="container mx-auto p-4">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Aperçu de votre budget</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-medium">{formattedMonth}</span>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <Card className={`mb-6 p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              barGap={0}
              barCategoryGap="35%"
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={[-1300, -650, 0, 650, 1300]}
                tick={{ fill: '#6B7280' }}
              />
              <Bar
                dataKey="expenses"
                fill="#E2E8F0"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="revenus"
                fill="#0D9488"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expenses Section */}
        <Card className={`p-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-xl font-bold mb-4">Dépenses</h3>
          <div className="space-y-3">
            {expenseCategories.map((category, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span>{category.icon}</span>
                  <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
                    {category.name}
                  </span>
                </div>
                <span className="text-red-500 font-medium">{category.amount} €</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="text-red-500 font-bold">-1240,89 €</span>
            </div>
          </div>
        </Card>

        {/* Revenue Section */}
        <Card className={`p-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-xl font-bold mb-4">Revenus</h3>
          <div className="flex justify-between items-center p-3">
            <div className="flex items-center gap-3">
              <span>💰</span>
              <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
                Revenus
              </span>
            </div>
            <span className="text-green-500 font-medium">1246,50 €</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;