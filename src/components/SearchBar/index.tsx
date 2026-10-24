import React from "react";

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch }) => (
  <div className="search-bar">
    <input
      type="search"
      value={query}
      onChange={(event) => onSearch(event.target.value)}
      aria-label="Buscar personagens pelo nome"
      placeholder="Digite o nome do seu personagem aqui"
    />
    <svg
      className="search-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm8.485-1.485l4.828 4.828-1.414 1.414-4.828-4.828A9.963 9.963 0 0 1 10 20a10 10 0 1 1 10-10c0 2.485-.906 4.758-2.415 6.515z" />
    </svg>
  </div>
);

export default SearchBar;
