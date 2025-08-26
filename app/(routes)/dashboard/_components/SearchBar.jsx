"use client";
import React from 'react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/app/(routes)/dashboard/_context/SearchContext';
import { Search } from 'lucide-react';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search for budgets, transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-[300px] pl-10"
      />
    </div>
  );
}

export default SearchBar;