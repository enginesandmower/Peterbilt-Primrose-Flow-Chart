import { useState, useEffect } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.name === item.name);
      if (exists) return prev.filter((fav) => fav.name !== item.name);
      return [...prev, item];
    });
  };

  const isFavorite = (item) => favorites.some((fav) => fav.name === item.name);

  return { favorites, toggleFavorite, isFavorite };
}