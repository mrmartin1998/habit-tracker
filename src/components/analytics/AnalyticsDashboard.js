import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { loadFromLocalStorage } from '@/lib/localStorage';

export default function AnalyticsDashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const habits = loadFromLocalStorage();

  const calculateStats = () => {
    const totalHabits = habits.length;
    const today = new Date().toISOString().split('T')[0];
    const completedToday = habits.filter(habit => 
      habit.completedDates.includes(today)
    ).length;
    
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    const completionRates = habits.map(habit => {
      const completedInPeriod = habit.completedDates.filter(date => 
        last30Days.includes(date)
      ).length;
      return {
        name: habit.name,
        rate: (completedInPeriod / 30) * 100
      };
    });

    return {
      totalHabits,
      completedToday,
      completionRates
    };
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const stats = calculateStats();
    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: stats.completionRates.map(h => h.name),
        datasets: [{
          label: '30-Day Completion Rate (%)',
          data: stats.completionRates.map(h => h.rate),
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
            max: 100
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [habits]);

  const stats = calculateStats();

  return (
    <div className="grid gap-6">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Habits</div>
          <div className="stat-value">{stats.totalHabits}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Completed Today</div>
          <div className="stat-value">{stats.completedToday}</div>
          <div className="stat-desc">
            {((stats.completedToday / stats.totalHabits) * 100).toFixed(0)}% completion rate
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">30-Day Completion Rates</h2>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
} 