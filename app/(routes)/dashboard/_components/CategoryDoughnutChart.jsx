"use client";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from 'next-themes';

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to generate dynamic and visually distinct colors
const generateDynamicColors = (count) => {
  const backgroundColors = [];
  const borderColors = [];
  // Use consistent saturation and lightness for a cohesive look
  const saturation = 70;
  const lightness = 60;

  for (let i = 0; i < count; i++) {
    // Evenly distribute the hue around the color wheel
    const hue = (i * 360) / count;
    backgroundColors.push(`hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`);
    borderColors.push(`hsla(${hue}, ${saturation}%, ${lightness}%, 1)`);
  }

  return { backgroundColors, borderColors };
};

function CategoryDoughnutChart({ title, dataList }) {
  const { theme } = useTheme();
  const [chartKey, setChartKey] = useState(0);

  // Force re-render of chart when theme changes
  useEffect(() => {
    setChartKey(prevKey => prevKey + 1);
  }, [theme]);

  // Generate a unique color for each category
  const { backgroundColors, borderColors } = generateDynamicColors(dataList.length);

  const data = {
    labels: dataList.map(item => item.category),
    datasets: [
      {
        label: 'Amount',
        data: dataList.map(item => item.total),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          // Make legend text visible in light/dark mode
          color: theme === 'dark' ? '#fff' : '#333',
        },
      },
      title: {
        display: true,
        text: title,
        // Make title text visible in light/dark mode
        color: theme === 'dark' ? '#fff' : '#333',
      },
    },
  };

  return <Doughnut key={chartKey} data={data} options={options} />;
}

export default CategoryDoughnutChart;