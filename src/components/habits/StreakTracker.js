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
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      
      // Get today's date in ISO format
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString().split('T')[0];

      // Calculate current streak
      if (sortedDates.includes(today)) {
        currentStreak = 1;
        let checkDate = yesterday;
        
        while (sortedDates.includes(checkDate)) {
          currentStreak++;
          checkDate = new Date(new Date(checkDate) - 86400000)
            .toISOString().split('T')[0];
        }
      }

      // Calculate longest streak
      sortedDates.forEach((date, index) => {
        if (index === 0) {
          tempStreak = 1;
        } else {
          const prevDate = new Date(sortedDates[index - 1]);
          const currDate = new Date(date);
          const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);
          
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
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Current Streak</div>
        <div className="stat-value text-primary">{streakInfo.currentStreak}</div>
        <div className="stat-desc">days in a row</div>
      </div>
      
      <div className="stat">
        <div className="stat-title">Longest Streak</div>
        <div className="stat-value text-secondary">{streakInfo.longestStreak}</div>
        <div className="stat-desc">personal best</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Completions</div>
        <div className="stat-value">{streakInfo.totalCompletions}</div>
        <div className="stat-desc">all time</div>
      </div>
    </div>
  );
} 