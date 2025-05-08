// src/components/SearchBar.tsx
import React, { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  onSearch?: (params: {
    where: string;
    dates: { from: string; to: string };
    guests: number;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [where, setWhere]     = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate]     = useState("");
  const [guests, setGuests]     = useState(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.({ where, dates: { from: fromDate, to: toDate }, guests });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto flex flex-wrap items-center gap-2 bg-white border rounded-full shadow px-4 py-2 mt-6"
    >
      <input
        type="text"
        placeholder="Where to?"
        value={where}
        onChange={(e) => setWhere(e.target.value)}
        className="flex-1 min-w-[120px] outline-none"
      />
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="flex-1 min-w-[120px] outline-none"
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="flex-1 min-w-[120px] outline-none"
      />
      <input
        type="number"
        min={1}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="flex-1 min-w-[80px] outline-none"
      />
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
