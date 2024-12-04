import { useState } from 'react';
import { HABIT_CATEGORIES, HABIT_ICONS } from '@/constants/habits';

export default function HabitForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: HABIT_CATEGORIES[0],
    icon: Object.keys(HABIT_ICONS)[0],
    frequency: 'daily',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      ...formData,
      id: Date.now().toString(),
      startDate: new Date().toISOString().split('T')[0],
      completedDates: [],
      active: true,
    };
    onSubmit(newHabit);
    onClose();
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className="card-title">Create New Habit</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Habit Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            {HABIT_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Icon</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(HABIT_ICONS).map(([icon, name]) => (
              <button
                key={icon}
                type="button"
                className={`btn btn-ghost text-xl ${formData.icon === icon ? 'btn-active' : ''}`}
                onClick={() => setFormData({...formData, icon})}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="card-actions justify-end mt-6">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Create Habit</button>
        </div>
      </form>
    </div>
  );
}
