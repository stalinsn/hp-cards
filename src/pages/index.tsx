// HomePage.tsx
import type { HpApiCharacter } from "@/types/characters";
import React, { useState, useEffect, useMemo } from "react";
import CharacterList from "@/components/CharacterList";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import BackToTop from "@/components/BackToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

const fetchCharacters = async () => {
  try {
    let charactersFromApi: Personagem[] | undefined;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/graphql`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
        }
      );

      if (!response.ok) {
        throw new Error(`GraphQL respondeu com status ${response.status}`);
      }

      const result = await response.json();
      if (!result.errors && Array.isArray(result.data?.personagens)) {
        charactersFromApi = result.data.personagens;
      } else {
        throw new Error("A resposta GraphQL não contém personagens válidos");
      }
    } catch (error) {
      console.warn("GraphQL indisponível; usando a API REST pública:", error);
    }

    if (!charactersFromApi?.length) {
      const response = await fetch(
        "https://hp-api.onrender.com/api/characters"
      );
      if (!response.ok) {
        throw new Error(`API REST respondeu com status ${response.status}`);
      }

      const apiCharacters: HpApiCharacter[] = await response.json();
      if (!Array.isArray(apiCharacters)) {
        throw new Error(
          "A resposta da API REST não contém uma lista de personagens"
        );
      }
      charactersFromApi = apiCharacters.map(mapApiCharacter);
    }

    return charactersFromApi;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    throw error;
  }
};

const HomePage: React.FC = () => {
  const [characters, setCharacters] = useState<Personagem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedHouse, setSelectedHouse] = useState<string>("");
  const [query, setQuery] = useState("");
  const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<boolean>(false);
  const itemsPerPage = 9;

  useEffect(() => {
    let cancelled = false;
    fetchCharacters()
      .then((loadedCharacters) => {
        if (!cancelled) setCharacters(loadedCharacters);
      })
      .catch(() => {
        if (!cancelled) setApiError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCharacters = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return characters.filter(
      (character) =>
        (!selectedHouse || character.casa?.toLowerCase() === selectedHouse) &&
        (!normalizedQuery ||
          character.nome
            ?.toLocaleLowerCase("pt-BR")
            .includes(normalizedQuery)) &&
        (!onlyWithPhoto || Boolean(character.imagem?.trim()))
    );
  }, [characters, selectedHouse, query, onlyWithPhoto]);

  const handleSelectHouse = (house: string) => {
    setSelectedHouse(house);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Personagens de Harry Potter</h1>

      <SearchBar query={query} onSearch={handleSearch} />

      <CategoryFilter
        selectedHouse={selectedHouse}
        onSelectHouse={handleSelectHouse}
      />

      <label className="photo-filter">
        <input
          type="checkbox"
          checked={onlyWithPhoto}
          onChange={(event) => {
            setOnlyWithPhoto(event.target.checked);
            setCurrentPage(1);
          }}
        />
        Somente personagens com foto
      </label>

      <p className="catalog-status" role="status">
        {loading
          ? "Carregando personagens…"
          : !apiError &&
            (filteredCharacters.length === 0
              ? "Nenhum personagem encontrado com esses filtros."
              : `${filteredCharacters.length} ${
                  filteredCharacters.length === 1
                    ? "personagem encontrado"
                    : "personagens encontrados"
                }`)}
      </p>

      {apiError && (
        <p className="api-error" role="alert">
          Não foi possível carregar os personagens. Verifique sua conexão e
          tente novamente.
        </p>
      )}

      <CharacterList
        characters={filteredCharacters}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      <BackToTop />
      <SpeedInsights />
    </div>
  );
};

export default HomePage;
