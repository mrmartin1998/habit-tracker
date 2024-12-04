import { useState, useRef, useEffect } from 'react';
import HabitProgress from './HabitProgress';
import StreakTracker from './StreakTracker';

export default function HabitCard({ habit, onToggle, onDelete, isExpanded, onToggleExpand }) {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef(null);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);

  return (
    <div 
      className="card w-full bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">
            <span className="text-2xl mr-2">{habit.icon}</span>
            {habit.name}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => onToggleExpand(habit.id)}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Toggle details"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isHovered && (
              <button 
                onClick={() => onDelete(habit.id)}
                className="btn btn-ghost btn-circle btn-sm"
                aria-label="Delete habit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <p className="text-sm opacity-70">{habit.category}</p>
        
        <div 
          ref={contentRef}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-4 py-4">
            <HabitProgress habit={habit} />
            <StreakTracker habit={habit} />
          </div>
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <span className="badge badge-outline">{habit.frequency}</span>
          <button 
            onClick={() => onToggle(habit.id)}
            className={`btn btn-sm min-w-[120px] ${
              isCompletedToday ? 'btn-success' : 'btn-outline'
            }`}
          >
            {isCompletedToday ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
