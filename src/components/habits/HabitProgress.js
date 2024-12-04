import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function HabitProgress({ habit }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const dates = getLast7Days();
    const completionData = dates.map(date => 
      habit.completedDates.includes(date) ? 1 : 0
    );

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
        datasets: [{
          label: 'Completion Status',
          data: completionData,
          backgroundColor: 'rgba(72, 187, 120, 0.5)',
          borderColor: 'rgb(72, 187, 120)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            ticks: {
              stepSize: 1,
              callback: value => value === 1 ? 'Done' : 'Not Done'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [habit.completedDates]);

  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
