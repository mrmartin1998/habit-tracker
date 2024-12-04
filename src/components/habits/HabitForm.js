import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FREQUENCIES = ['daily', 'weekly', 'monthly'];
const CATEGORIES = ['Health', 'Productivity', 'Learning', 'Fitness', 'Other'];
const ICONS = ['📚', '💪', '🏃‍♂️', '🧘‍♂️', '💻', '🎨', '🎵', '✍️', '🌱', '🧠'];

export default function HabitForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '📚',
    category: 'Productivity',
    frequency: 'daily'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      id: uuidv4(),
      ...formData,
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    onSubmit(newHabit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create New Habit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Habit Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Icon</span>
            </label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="select select-bordered"
            >
              {ICONS.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Frequency</span>
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="select select-bordered"
            >
              {FREQUENCIES.map(freq => (
                <option key={freq} value={freq}>{freq}</option>
              ))}
            </select>
          </div>

          <div className="card-actions justify-end mt-6">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
