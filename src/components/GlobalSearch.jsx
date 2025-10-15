import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GlobalSearch({ data }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    if (!value.trim()) { setResults([]); return; }
    const lower = value.toLowerCase();
    const matched = Object.entries(data).flatMap(([category, items]) =>
      items.filter((i) => i.name.toLowerCase().includes(lower)).map((i) => ({ ...i, category }))
    );
    setResults(matched);
  };

  const handleSelect = (item) => {
    navigate(`/category/${encodeURIComponent(item.category)}`);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full md:w-80">
      <input
        type="text"
        placeholder="Search all categories..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white dark:bg-gray-800 border rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {results.map((item, idx) => (
            <li key={idx} onClick={() => handleSelect(item)} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-700 cursor-pointer">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">{item.category}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}