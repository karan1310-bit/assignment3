// src/App.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './store/slices/todoSlice';
import { logout } from './store/slices/authSlice';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Login from './components/Login';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const todos = useSelector(state => state.todos.items);
  const [activeTab, setActiveTab] = useState('Today');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch(setTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  if (!isAuthenticated) {
    return <Login />;
  }

  const todayTasks = todos.filter(todo => !todo.completed).length;

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <div className="flex items-center space-x-2 mb-8">
          <img src={user?.photoUrl || '/api/placeholder/32/32'} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="text-white">Hey, {user?.name || 'User'}</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('All Tasks')}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg ${activeTab === 'All Tasks' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-gray-300">All Tasks</span>
          </button>

          <button
            onClick={() => setActiveTab('Today')}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg ${activeTab === 'Today' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-300">Today</span>
          </button>

          <button
            onClick={() => setActiveTab('Important')}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg ${activeTab === 'Important' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-gray-300">Important</span>
          </button>
        </nav>

        <div className="mt-8">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">Today Tasks</div>
            <div className="text-2xl text-white font-bold">{todayTasks}</div>
          </div>
        </div>

        <button
          onClick={() => dispatch(logout())}
          className="mt-8 w-full p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <TaskInput />
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">{activeTab}</h2>
            <TaskList filter={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;