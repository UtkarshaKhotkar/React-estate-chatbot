import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = [
  'rgb(102, 126, 234)',
  'rgb(118, 75, 162)',
  'rgb(237, 100, 166)',
  'rgb(255, 154, 158)',
  'rgb(250, 208, 196)'
];

function PriceChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-muted">No chart data available</p>;
  }

  // Extract all unique years
  const allYears = [...new Set(
    data.flatMap(item => item.data.map(d => d.year))
  )].sort();

  const chartData = {
    labels: allYears,
    datasets: data.map((areaData, idx) => ({
      label: `${areaData.area} - Price`,
      data: allYears.map(year => {
        const yearData = areaData.data.find(d => d.year === year);
        return yearData ? yearData.price : null;
      }),
      borderColor: COLORS[idx % COLORS.length],
      backgroundColor: COLORS[idx % COLORS.length].replace('rgb', 'rgba').replace(')', ', 0.1)'),
      tension: 0.3
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Trends Over Time'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '₹' + context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PriceChart;
