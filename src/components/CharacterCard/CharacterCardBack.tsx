import React from 'react';

interface Personagem {
  id?: string;
  nome?: string;
  especie?: string;
  genero?: string;
  bruxo?: boolean;
  vivo?: boolean;
  varinha?: {
    madeira?: string;
    nucleo?: string;
    comprimento?: number;
  };
}

interface CharacterCardBackProps {
  character: Personagem;
}

const CharacterCardBack: React.FC<CharacterCardBackProps> = ({ character }) => {
  return (
    <div className="card-back">
      <h2>{character.nome}</h2>
      {character.especie && <p>Espécie: {character.especie}</p>}
      {character.genero && <p>Gênero: {character.genero}</p>}
      {character.bruxo !== undefined && <p>Bruxo: {character.bruxo ? 'Sim' : 'Não'}</p>}
      {character.vivo !== undefined && <p>Vivo: {character.vivo ? 'Sim' : 'Não'}</p>}
      {character.varinha && (
        <div>
          <h3>Varinha:</h3>
          <p>Madeira: {character.varinha.madeira || 'Desconhecido'}</p>
          <p>Núcleo: {character.varinha.nucleo || 'Desconhecido'}</p>
          <p>Comprimento: {character.varinha.comprimento ? `${character.varinha.comprimento} cm` : 'Desconhecido'}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterCardBack;
