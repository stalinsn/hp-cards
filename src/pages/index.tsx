// HomePage.tsx
import React, { useState, useEffect } from 'react';
import CharacterList from '@/components/CharacterList';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import BackToTop from '@/components/BackToTop';
interface Personagem {
  id?: string;
  nome?: string;
  casa?: string;
  dataDeNascimento?: string;
  ator?: string;
  patrono?: string;
  especie?: string;
  genero?: string;
  bruxo?: boolean;
  vivo?: boolean;
  varinha?: {
    madeira?: string;
    nucleo?: string;
    comprimento?: number;
  };
  imagem?: string;
}

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState<Personagem[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Personagem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedHouse, setSelectedHouse] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const itemsPerPage = 9;

  const fetchCharacters = async () => {
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              personagens {
                id
                nome
                casa
                dataDeNascimento
                ator
                patrono
                especie
                genero
                bruxo
                vivo
                varinha {
                  madeira
                  nucleo
                  comprimento
                }
                imagem
              }
            }
          `,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error('Erro ao buscar personagens:', result.errors);
      } else {
        setCharacters(result.data.personagens);
        setFilteredCharacters(result.data.personagens);
      }
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectHouse = (house: string) => {
    setSelectedHouse(house);
    setCurrentPage(1);
    if (house === '') {
      setFilteredCharacters(characters);
      setShowError(false);
    } else {
      const filtered = characters.filter((character) => character.casa?.toLowerCase() === house.toLowerCase());
      setFilteredCharacters(filtered);
      setShowError(false);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = characters.filter((character) =>
      character.nome?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCharacters(filtered);
    setShowError(filtered.length === 0);
  };

  const resetSearch = () => {
    setFilteredCharacters(characters);
    setShowError(false);
  };

  return (
    <div className="container">
      <h1>Personagens de Harry Potter</h1>

      <SearchBar onSearch={handleSearch} resetSearch={resetSearch} showError={showError} />

      <CategoryFilter selectedHouse={selectedHouse} onSelectHouse={handleSelectHouse} />

      <CharacterList
        characters={filteredCharacters}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <BackToTop />
    </div>
  );
};

export default HomePage;
