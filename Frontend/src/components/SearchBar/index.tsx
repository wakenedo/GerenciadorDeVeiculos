import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.toLowerCase()); // Normalize search input
  };

  return (
    <input
      type="text"
      placeholder="Buscar por marca, modelo, ano ou placa..."
      value={query}
      onChange={handleChange}
      className="border p-2 rounded w-full mt-2"
    />
  );
};

export default SearchBar;
