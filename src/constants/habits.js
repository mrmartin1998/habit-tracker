// Default habit categories
export const HABIT_CATEGORIES = [
  'Health',
  'Fitness',
  'Learning',
  'Productivity',
  'Mindfulness',
];

// Sample habit icons (we'll use emojis for simplicity)
export const HABIT_ICONS = {
  '💪': 'Exercise',
  '📚': 'Reading',
  '💧': 'Drink Water',
  '🧘': 'Meditate',
  '✍️': 'Journal',
};

// Habit data structure
export const HABIT_STRUCTURE = {
  id: '', // Unique identifier
  name: '', // Habit name
  category: '', // One of HABIT_CATEGORIES
  icon: '', // One of HABIT_ICONS
  frequency: 'daily', // How often to track
  startDate: '', // When the habit tracking began
  completedDates: [], // Array of dates when habit was completed
  active: true, // Whether the habit is currently being tracked
};
