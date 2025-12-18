import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Check, X, Edit2, Trash2, Search, Moon, Sun, CheckCircle, Star
} from 'lucide-react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todo-list-app');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  const inputRef = useRef(null);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('dark-mode', JSON.stringify(newMode));
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('todo-list-app', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      favorite: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleFavorite = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'favorites') return todo.favorite;
    if (search && !todo.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    favorites: todos.filter(t => t.favorite).length,
  };

  const TodoItem = ({ todo }) => {
    const isEditing = editingId === todo.id;

    return (
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit(todo.id);
                if (e.key === 'Escape') setEditingId(null);
              }}
            />
            <div className="edit-actions">
              <button onClick={() => saveEdit(todo.id)} className="save-btn">
                <Check size={16} /> Save
              </button>
              <button onClick={() => setEditingId(null)} className="cancel-btn">
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="todo-main" onClick={() => toggleTodo(todo.id)}>
              <div className={`checkbox ${todo.completed ? 'checked' : ''}`}>
                {todo.completed && <Check size={16} />}
              </div>
              <span className="todo-text">{todo.text}</span>
            </div>
            <div className="todo-actions">
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(todo.id); }}
                className={`action-btn favorite-btn ${todo.favorite ? 'favorited' : ''}`}
                title={todo.favorite ? "Unfavorite" : "Favorite"}
              >
                <Star size={16} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); startEdit(todo); }}
                className="action-btn edit-btn"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}
                className="action-btn delete-btn"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <CheckCircle className="logo-icon" />
            <h1>Todo List</h1>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="theme-toggle"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <p className="tagline">My Task Manager</p>
      </header>

      <main className="main">
        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number active">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat">
            <span className="stat-number completed">{stats.completed}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat">
            <span className="stat-number favorite">{stats.favorites}</span>
            <span className="stat-label">Favorites</span>
          </div>
        </div>

        {/* Add Form */}
        <form onSubmit={addTodo} className="add-form">
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
              required
            />
            <button type="submit" className="add-btn">
              <Plus size={20} /> Add
            </button>
          </div>
        </form>

        {/* Search */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>

        {/* Filters */}
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >All</button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >Active</button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >Completed</button>
          <button 
            className={`filter-btn ${filter === 'favorites' ? 'active' : ''}`}
            onClick={() => setFilter('favorites')}
          >Favorites</button>
        </div>

        {/* Todo List */}
        <div className="todo-list-container">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks found</h3>
              <p>
                {search ? "Try a different search" :
                 filter !== 'all' ? "No tasks match this filter" :
                 "Add your first task!"}
              </p>
            </div>
          ) : (
            <div className="todos">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>

        {/* Clear completed */}
        {stats.completed > 0 && (
          <button onClick={clearCompleted} className="clear-btn">
            <Trash2 size={16} /> Clear Completed ({stats.completed})
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
