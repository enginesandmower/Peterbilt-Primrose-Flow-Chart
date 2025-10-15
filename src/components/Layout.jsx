import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import GlobalSearch from './GlobalSearch';
import { categories } from '../data';
import { data } from '../data';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <aside className="bg-blue-900 dark:bg-blue-800 text-white flex flex-col transition-all duration-300 shadow-xl" style={{ width: menuOpen ? 220 : 60 }}>
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">☰</button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <Link to="/favorites" className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 text-sm">
            {menuOpen ? '⭐ Favorites' : '★'}
          </Link>
          {categories.map((cat) => (
            <Link key={cat} to={`/category/${encodeURIComponent(cat)}`} className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 text-sm">
              {menuOpen ? cat : cat.charAt(0)}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-700 dark:border-blue-600">
          <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700">Logout</Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Primrose Flow Chart</h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <GlobalSearch data={data} />
            <Button onClick={toggleDarkMode} className="bg-gray-600 hover:bg-gray-700">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </Button>
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 hidden md:block">Logout</Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}