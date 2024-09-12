import React from 'react';

interface Personagem {
  id?: string;
  nome?: string;
  casa?: string;
  dataDeNascimento?: string;
  ator?: string;
  patrono?: string;
  imagem?: string;
}

interface CharacterCardFrontProps {
  character: Personagem;
}

const CharacterCardFront: React.FC<CharacterCardFrontProps> = ({ character }) => {
  return (
    <div className="card-front">
      {/* Container da Imagem */}
      <div className="image-container">
        {character.imagem ? (
          <img src={character.imagem} alt={character.nome} />
        ) : (
          <div className="image-placeholder">Imagem não disponível</div>
        )}
      </div>

      {/* Container de Informações */}
      <div className="info-container">
        <h2>{character.nome}</h2>
        {character.casa && <p>Casa: {character.casa}</p>}
        {character.patrono && <p>Patrono: {character.patrono}</p>}
        {character.dataDeNascimento && <p>Data de Nascimento: {character.dataDeNascimento}</p>}
        {character.ator && <p>Ator: {character.ator}</p>}
      </div>
    </div>
  );
};

export default CharacterCardFront;
