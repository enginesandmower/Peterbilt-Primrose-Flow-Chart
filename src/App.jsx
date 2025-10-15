import { useState } from 'react';
import { Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import FavoritesPage from './components/FavoritesPage';
import CategoryPage from './components/CategoryPage';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { categories } from './data';

const PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'Primrose2025';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem('authenticated', 'true');
      onLogin(true);
    } else {
      setError('Incorrect password');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-4">Primrose Access</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoryList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {categories.map((cat) => (
        <Link key={cat} to={`/category/${encodeURIComponent(cat)}`}>
          <Card className="p-4 text-center shadow-md hover:bg-gray-100 dark:bg-gray-800">
            <CardContent>
              <h2 className="text-lg font-semibold">{cat}</h2>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function CategoryRenderer() {
  const { category } = useParams();
  return <CategoryPage category={decodeURIComponent(category)} />;
}

function ProtectedRoute({ children }) {
  const authed = localStorage.getItem('authenticated') === 'true';
  return authed ? children : <Navigate to="/login" />;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('authenticated') === 'true');

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setLoggedIn} />} />
      <Route path="/" element={<ProtectedRoute><Layout><CategoryList /></Layout></ProtectedRoute>} />
      <Route path="/category/:category" element={<ProtectedRoute><Layout><CategoryRenderer /></Layout></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><Layout><FavoritesPage /></Layout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}