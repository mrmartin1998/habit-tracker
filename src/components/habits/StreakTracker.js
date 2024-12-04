import { useEffect, useState } from 'react';

export default function StreakTracker({ habit }) {
  const [streakInfo, setStreakInfo] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalCompletions: 0
  });

  useEffect(() => {
    const calculateStreaks = () => {
      const sortedDates = [...habit.completedDates].sort();
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      // Calculate current streak
      let currentStreak = 0;
      if (sortedDates.includes(today)) {
        currentStreak = 1;
        let checkDate = yesterday;
        
        while (sortedDates.includes(checkDate)) {
          currentStreak++;
          const prevDate = new Date(checkDate);
          prevDate.setDate(prevDate.getDate() - 1);
          checkDate = prevDate.toISOString().split('T')[0];
        }
      }

      // Calculate longest streak
      let longestStreak = 0;
      let tempStreak = 0;

      sortedDates.forEach((date, index) => {
        if (index === 0) {
          tempStreak = 1;
        } else {
          const prevDate = new Date(sortedDates[index - 1]);
          const currDate = new Date(date);
          const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      });

      setStreakInfo({
        currentStreak,
        longestStreak,
        totalCompletions: sortedDates.length
      });
    };

    calculateStreaks();
  }, [habit.completedDates]);

  return (
    <div className="flex justify-center">
      <div className="stats stats-horizontal shadow-md w-full">
        <div className="stat py-2">
          <div className="stat-title text-xs">Current</div>
          <div className="stat-value text-primary text-lg">{streakInfo.currentStreak}</div>
          <div className="stat-desc text-xs">days</div>
        </div>
        
        <div className="stat py-2">
          <div className="stat-title text-xs">Best</div>
          <div className="stat-value text-secondary text-lg">{streakInfo.longestStreak}</div>
          <div className="stat-desc text-xs">days</div>
        </div>

        <div className="stat py-2">
          <div className="stat-title text-xs">Total</div>
          <div className="stat-value text-lg">{streakInfo.totalCompletions}</div>
          <div className="stat-desc text-xs">times</div>
        </div>
      </div>
    </div>
  );
} 