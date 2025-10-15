import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.toLowerCase());
  };
  return (
    <div className="w-full mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}