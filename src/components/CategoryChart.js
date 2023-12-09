import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function CategoryChart({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      if (chartInstanceRef.current) {
        // Destroy the existing chart instance if it exists
        chartInstanceRef.current.destroy();
      }

      const chartData = {
        labels: data.map((category) => category.categoryName),
        datasets: [
          {
            label: 'Product Count',
            data: data.map((category) => category.productCount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      };

      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...data.map((category) => category.productCount)) + 1,
          },
        },
      };

      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
}

export default CategoryChart;