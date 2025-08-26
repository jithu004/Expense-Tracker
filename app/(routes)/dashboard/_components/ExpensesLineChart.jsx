"use client";
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from 'next-themes';
import { format, parseISO, startOfWeek, startOfMonth, startOfYear, subDays, subWeeks, subMonths, subYears } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const processDataForChart = (expenses, filter) => {
  const now = new Date();
  const aggregation = {};

  // Aggregate all expenses first based on the filter type
  expenses.forEach(ex => {
    const date = parseISO(ex.createdAt);
    let key;
    if (filter === 'weekly') key = format(startOfWeek(date), 'yyyy-MM-dd');
    else if (filter === 'monthly') key = format(startOfMonth(date), 'yyyy-MM');
    else if (filter === 'yearly') key = format(startOfYear(date), 'yyyy');
    else key = format(date, 'yyyy-MM-dd');
    
    if (!aggregation[key]) {
      aggregation[key] = 0;
    }
    aggregation[key] += Number(ex.amount);
  });

  // Now, generate consistent labels and match data
  const labels = [];
  const dataPoints = [];

  switch (filter) {
    case 'weekly':
      for (let i = 4; i >= 0; i--) {
        const weekStartDate = startOfWeek(subWeeks(now, i));
        const key = format(weekStartDate, 'yyyy-MM-dd');
        labels.push(`Week of ${format(weekStartDate, 'MMM d')}`);
        dataPoints.push(aggregation[key] || 0);
      }
      break;
    case 'monthly':
      for (let i = 5; i >= 0; i--) {
        const monthDate = startOfMonth(subMonths(now, i));
        const key = format(monthDate, 'yyyy-MM');
        labels.push(format(monthDate, 'MMM yyyy'));
        dataPoints.push(aggregation[key] || 0);
      }
      break;
    case 'yearly':
      for (let i = 4; i >= 0; i--) {
        const yearDate = startOfYear(subYears(now, i));
        const key = format(yearDate, 'yyyy');
        labels.push(format(yearDate, 'yyyy'));
        dataPoints.push(aggregation[key] || 0);
      }
      break;
    default: // daily
      for (let i = 6; i >= 0; i--) {
        const date = subDays(now, i);
        const key = format(date, 'yyyy-MM-dd');
        labels.push(format(date, 'MMM d'));
        dataPoints.push(aggregation[key] || 0);
      }
      break;
  }

  return { labels, dataPoints };
};


function ExpensesLineChart({ allExpenses, timeFilter }) {
  const { theme } = useTheme();
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey(prevKey => prevKey + 1);
  }, [theme, timeFilter]);

  const { labels, dataPoints } = processDataForChart(allExpenses, timeFilter);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: dataPoints,
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: theme === 'dark' ? '#fff' : '#333' }
      },
      title: {
        display: true,
        text: 'Expense Insights',
        color: theme === 'dark' ? '#fff' : '#333'
      },
    },
    scales: {
        x: { ticks: { color: theme === 'dark' ? '#fff' : '#333' } },
        y: { ticks: { color: theme === 'dark' ? '#fff' : '#333' } }
    }
  };

  return <Line key={chartKey} options={options} data={data} />;
}

export default ExpensesLineChart;