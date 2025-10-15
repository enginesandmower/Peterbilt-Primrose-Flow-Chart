import { useState } from 'react';
import SearchBar from './SearchBar';
import { Card, CardContent } from './ui/card';
import { data } from '../data';
import useFavorites from '../hooks/useFavorites';

export default function CategoryPage({ category }) {
  const items = data[category] || [];
  const [filteredItems, setFilteredItems] = useState(items);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleSearch = (query) => {
    if (!query) setFilteredItems(items);
    else setFilteredItems(items.filter((item) => item.name.toLowerCase().includes(query)));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category}</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <Card key={idx} className="p-4 shadow-sm dark:bg-gray-800 relative">
              <CardContent>
                <button
                  onClick={() => toggleFavorite({ ...item, category })}
                  className={`absolute top-2 right-2 text-xl ${isFavorite(item) ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'}`}
                >
                  ★
                </button>
                <h2 className="font-semibold mb-2">{item.name}</h2>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Technical Data
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No results found.</p>
        )}
      </div>
    </div>
  );
}