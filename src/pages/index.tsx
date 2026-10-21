// HomePage.tsx
import React, { useState, useEffect } from 'react';
import CharacterList from '@/components/CharacterList';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import BackToTop from '@/components/BackToTop';
import { SpeedInsights } from "@vercel/speed-insights/next"
interface Personagem {
  id?: string;
  nome?: string;
  nomes_alternativos?: string[];
  casa?: string;
  dataDeNascimento?: string;
  anoDeNascimento?: number;
  ator?: string;
  patrono?: string;
  especie?: string;
  genero?: string;
  bruxo?: boolean;
  vivo?: boolean;
  ancestralidade?: string;
  corDosOlhos?: string;
  corDoCabelo?: string;
  estudanteDeHogwarts?: boolean;
  staffDeHogwarts?: boolean;
  atores_alternativos?: string[];
  varinha?: {
    madeira?: string;
    nucleo?: string;
    comprimento?: number;
  };
  imagem?: string;
}

interface HpApiCharacter {
  id: string;
  name?: string | null;
  alternate_names?: string[] | null;
  species?: string | null;
  gender?: string | null;
  house?: string | null;
  dateOfBirth?: string | null;
  yearOfBirth?: number | null;
  wizard?: boolean | null;
  ancestry?: string | null;
  eyeColour?: string | null;
  hairColour?: string | null;
  wand?: {
    wood?: string | null;
    core?: string | null;
    length?: number | null;
  } | null;
  patronus?: string | null;
  hogwartsStudent?: boolean | null;
  hogwartsStaff?: boolean | null;
  actor?: string | null;
  alternate_actors?: string[] | null;
  alive?: boolean | null;
  image?: string | null;
}

const mapApiCharacter = (character: HpApiCharacter): Personagem => ({
  id: character.id,
  nome: character.name ?? undefined,
  nomes_alternativos: character.alternate_names ?? undefined,
  especie: character.species ?? undefined,
  genero: character.gender ?? undefined,
  casa: character.house ?? undefined,
  dataDeNascimento: character.dateOfBirth ?? undefined,
  anoDeNascimento: character.yearOfBirth ?? undefined,
  bruxo: character.wizard ?? undefined,
  ancestralidade: character.ancestry ?? undefined,
  corDosOlhos: character.eyeColour ?? undefined,
  corDoCabelo: character.hairColour ?? undefined,
  varinha: character.wand
    ? {
        madeira: character.wand.wood ?? undefined,
        nucleo: character.wand.core ?? undefined,
        comprimento: character.wand.length ?? undefined,
      }
    : undefined,
  patrono: character.patronus ?? undefined,
  estudanteDeHogwarts: character.hogwartsStudent ?? undefined,
  staffDeHogwarts: character.hogwartsStaff ?? undefined,
  ator: character.actor ?? undefined,
  atores_alternativos: character.alternate_actors ?? undefined,
  vivo: character.alive ?? undefined,
  imagem: character.image ?? undefined,
});

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState<Personagem[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Personagem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedHouse, setSelectedHouse] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const itemsPerPage = 9;

  const fetchCharacters = async () => {
    try {
      let charactersFromApi: Personagem[] | undefined;

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

        if (!response.ok) {
          throw new Error(`GraphQL respondeu com status ${response.status}`);
        }

        const result = await response.json();
        if (!result.errors && Array.isArray(result.data?.personagens)) {
          charactersFromApi = result.data.personagens;
        } else {
          throw new Error('A resposta GraphQL não contém personagens válidos');
        }
      } catch (error) {
        console.warn('GraphQL indisponível; usando a API REST pública:', error);
      }

      if (!charactersFromApi?.length) {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        if (!response.ok) {
          throw new Error(`API REST respondeu com status ${response.status}`);
        }

        const apiCharacters: HpApiCharacter[] = await response.json();
        if (!Array.isArray(apiCharacters)) {
          throw new Error('A resposta da API REST não contém uma lista de personagens');
        }
        charactersFromApi = apiCharacters.map(mapApiCharacter);
      }

      setCharacters(charactersFromApi);
      setFilteredCharacters(charactersFromApi);
      setCurrentPage(1);
      setApiError(false);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
      setApiError(true);
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
    setCurrentPage(1);
    const filtered = characters.filter((character) =>
      character.nome?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCharacters(filtered);
    setShowError(filtered.length === 0);
  };

  const resetSearch = () => {
    setCurrentPage(1);
    setFilteredCharacters(characters);
    setShowError(false);
  };

  return (
    <div className="container">
      <h1>Personagens de Harry Potter</h1>

      <SearchBar onSearch={handleSearch} resetSearch={resetSearch} showError={showError} />

      <CategoryFilter selectedHouse={selectedHouse} onSelectHouse={handleSelectHouse} />

      {apiError && (
        <p className="api-error" role="alert">
          Não foi possível carregar os personagens. Verifique sua conexão e tente novamente.
        </p>
      )}

      <CharacterList
        characters={filteredCharacters}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <BackToTop />
      <SpeedInsights/>
    </div>
  );
};

export default HomePage;
