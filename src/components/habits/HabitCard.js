import { useState } from 'react';

export default function HabitCard({ habit, onToggle, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);

  return (
    <div 
      className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">
            <span className="text-2xl mr-2">{habit.icon}</span>
            {habit.name}
          </h2>
          {isHovered && (
            <button 
              onClick={() => onDelete(habit.id)}
              className="btn btn-ghost btn-circle btn-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <p className="text-sm opacity-70">{habit.category}</p>
        
        <div className="card-actions justify-between items-center mt-4">
          <span className="badge badge-outline">{habit.frequency}</span>
          <button 
            className={`btn ${isCompletedToday ? 'btn-success' : 'btn-outline'}`}
            onClick={() => onToggle(habit.id)}
          >
            {isCompletedToday ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
