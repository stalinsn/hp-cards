import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  resetSearch: () => void;
  showError: boolean; // Novo estado para exibir o erro
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, resetSearch, showError }) => {
  const [query, setQuery] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Limpa o timeout anterior
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Define o novo timeout para 3 segundos
    setTypingTimeout(
      setTimeout(() => {
        if (value.length >= 3) {
          onSearch(value); // Executa a busca se mais de 3 caracteres
        } else if (value.length === 0) {
          resetSearch(); // Reseta a busca se o campo estiver vazio
        }
      }, 3000) // 3 segundos para detectar inatividade
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.length >= 3) {
      // Executa a busca se a tecla Enter for pressionada e a query tiver mais de 3 caracteres
      if (typingTimeout) {
        clearTimeout(typingTimeout); // Cancela o timeout para evitar busca duplicada
      }
      onSearch(query);
    }
  };

  useEffect(() => {
    // Limpa o timeout ao desmontar o componente
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress} // Adiciona o evento para capturar o Enter
        placeholder="Digite o nome do seu personagem aqui"
        className={showError ? 'error' : ''}
      />
      <svg
        className="search-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm8.485-1.485l4.828 4.828-1.414 1.414-4.828-4.828A9.963 9.963 0 0 1 10 20a10 10 0 1 1 10-10c0 2.485-.906 4.758-2.415 6.515z" />
      </svg>
      {showError && <div className="tooltip">Nenhum resultado encontrado</div>}
    </div>
  );
};

export default SearchBar;
