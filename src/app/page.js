'use client';
import { useState } from 'react';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';
import { saveToLocalStorage, loadFromLocalStorage } from '@/lib/localStorage';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleCreateHabit = (newHabit) => {
    const currentHabits = loadFromLocalStorage();
    const updatedHabits = [...currentHabits, newHabit];
    saveToLocalStorage(updatedHabits);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Habits</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create New Habit
        </button>
      </div>

      <HabitList />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <HabitForm 
            onSubmit={handleCreateHabit}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}
