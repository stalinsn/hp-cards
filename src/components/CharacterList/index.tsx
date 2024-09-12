// CharacterList.tsx
import React from 'react';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';

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

interface CharacterListProps {
  characters: Personagem[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, currentPage, itemsPerPage, onPageChange }) => {
  const indexOfLastCharacter = currentPage * itemsPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  return (
    <div className="character-list">
      {currentCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          cardClass={character.casa || 'no-house'}
        />
      ))}
      {/* Renderiza a barra de paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(characters.length / itemsPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CharacterList;
