'use client';

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://0.0.0.0:8000" // Replace with your FastAPI backend URL
});

interface DataPoint {
  DATE_TIME: string;
  result: number;
}

interface LineChartProps {
  username: string;
}

const LineChart: React.FC<LineChartProps> = ({ username }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; results: number[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<DataPoint[]>(`/read/results/${username}`);
        const data = response.data;

        const labels = data.map((item) => new Date(item.DATE_TIME).toLocaleTimeString());
        const results = data.map((item) => item.result);

        setChartData({ labels, results });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    if (!chartData || !chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Results over Time',
            data: chartData.results,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Result',
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy(); // Clean up the chart instance on unmount
    };
  }, [chartData]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
