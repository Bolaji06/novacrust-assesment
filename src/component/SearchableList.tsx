
import React, { useState, useMemo } from 'react';
import { SearchIcon } from './Icons';

export interface ListItem {
  id: string;
  title: string;
  subtitle?: string; // For network name or extra info
  icon: React.ReactNode;
}

interface SearchableListProps {
  items: ListItem[];
  onSelect: (id: string) => void;
  hasSearch?: boolean;
}

export const SearchableList: React.FC<SearchableListProps> = ({
  items,
  onSelect,
  hasSearch = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const lowerQuery = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.subtitle?.toLowerCase().includes(lowerQuery)
    );
  }, [items, searchQuery]);

  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-dropdown border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {hasSearch && (
        <div className="p-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary transition-colors placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>
      )}
      
      <div className="max-h-60 overflow-y-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="w-full flex items-center text-primary gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group"
            >
              <div className="shrink-0">{item.icon}</div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-primary group-hover:text-primary transition-colors">
                  {item.title}
                  {item.subtitle && (
                     <span className="text-gray-500 font-normal ml-1">- {item.subtitle}</span>
                  )}
                </span>
                
              </div>
            </button>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-400">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};