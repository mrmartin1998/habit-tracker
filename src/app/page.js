'use client';
import { useState, useEffect } from 'react';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';
import { saveToLocalStorage, loadFromLocalStorage } from '@/lib/localStorage';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = loadFromLocalStorage();
    if (savedHabits) {
      setHabits(savedHabits);
    }
  }, []);

  const handleCreateHabit = (newHabit) => {
    setHabits(currentHabits => {
      const updatedHabits = [...currentHabits, newHabit];
      saveToLocalStorage(updatedHabits);
      return updatedHabits;
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Habit Tracker</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Create New Habit
          </button>
        </div>

        <HabitList habits={habits} setHabits={setHabits} />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <HabitForm 
            onSubmit={handleCreateHabit}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}
