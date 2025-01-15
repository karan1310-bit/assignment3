import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload.text,
        priority: action.payload.priority || 'medium',
        completed: false,
        weatherData: action.payload.weatherData
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setTodos: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;