import React, { useState } from 'react';
import CharacterCardFront from './CharacterCardFront';
import CharacterCardBack from './CharacterCardBack';

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

interface CharacterCardProps {
  character: Personagem;
  cardClass: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, cardClass }) => {
  const [flipped, setFlipped] = useState(false); // Estado para controlar o flip

  const handleCardClick = () => {
    setFlipped(!flipped); // Inverte o estado ao clicar no card
  };

  return (
    <div 
      className={`character-card ${cardClass.toLowerCase()} ${flipped ? 'flipped' : ''}`} 
      onClick={handleCardClick} // Flip ao clicar
    >
      {/* Adicionando o container interno para o efeito de flip */}
      <div className="card-inner">
        {/* Parte da frente do card */}
        <CharacterCardFront character={character} />

        {/* Parte de trás do card */}
        <CharacterCardBack character={character} />
      </div>
    </div>
  );
};

export default CharacterCard;
