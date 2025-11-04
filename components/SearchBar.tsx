
import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by company name, industry, or keyword..."
        className="w-full pl-10 pr-4 py-3 bg-base-200 text-content rounded-full border border-base-300 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
      />
      <button 
        type="submit"
        className="absolute inset-y-0 right-0 m-1.5 px-6 py-2 bg-brand-primary text-white font-semibold rounded-full hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-secondary transition-colors"
      >
        Search
      </button>
    </form>
  );
};
