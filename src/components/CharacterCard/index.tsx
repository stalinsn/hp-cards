import React, { useState, useId } from "react";
import CharacterCardFront from "./CharacterCardFront";
import CharacterCardBack from "./CharacterCardBack";

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

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  cardClass,
}) => {
  const contentId = useId();
  const [flipped, setFlipped] = useState(false); // Estado para controlar o flip

  const handleCardClick = () => {
    setFlipped((previous) => !previous); // Inverte o estado ao clicar no card
  };

  return (
    <div
      className={`character-card ${cardClass.toLowerCase()} ${
        flipped ? "flipped" : ""
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Virar card de ${character.nome ?? "personagem"}`}
      aria-pressed={flipped}
      aria-describedby={contentId}
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Adicionando o container interno para o efeito de flip */}
      <div className="card-inner" id={contentId}>
        {/* Parte da frente do card */}
        <CharacterCardFront
          key={character.imagem}
          character={character}
          hidden={flipped}
        />

        {/* Parte de trás do card */}
        <CharacterCardBack character={character} hidden={!flipped} />
      </div>
    </div>
  );
};

export default CharacterCard;
