import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/slices/todoSlice';

const TaskList = ({ filter }) => {
  const todos = useSelector(state => state.todos.items);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Today') return !todo.completed;
    if (filter === 'Important') return todo.priority === 'high';
    return true;
  });

  return (
    <div className="space-y-3">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className="w-5 h-5 rounded border-gray-400 text-green-600 focus:ring-green-500"
            />
            <span className={`text-white ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            {todo.priority === 'high' && (
              <span className="bg-red-500 text-xs text-white px-2 py-1 rounded">High</span>
            )}
          </div>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="text-gray-400 hover:text-red-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;