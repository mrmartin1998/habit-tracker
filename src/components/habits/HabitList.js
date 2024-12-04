import { useState, useEffect } from 'react';
import HabitCard from './HabitCard';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/localStorage';

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = loadFromLocalStorage();
    setHabits(savedHabits);
  }, []);

  const handleToggleHabit = (habitId) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(currentHabits => {
      const updatedHabits = currentHabits.map(habit => {
        if (habit.id === habitId) {
          const completedDates = habit.completedDates.includes(today)
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today];
          
          return { ...habit, completedDates };
        }
        return habit;
      });
      
      saveToLocalStorage(updatedHabits);
      return updatedHabits;
    });
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(currentHabits => {
      const updatedHabits = currentHabits.filter(habit => habit.id !== habitId);
      saveToLocalStorage(updatedHabits);
      return updatedHabits;
    });
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold">No habits yet!</h3>
        <p className="text-gray-500">Create your first habit to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={handleToggleHabit}
          onDelete={handleDeleteHabit}
        />
      ))}
    </div>
  );
}
