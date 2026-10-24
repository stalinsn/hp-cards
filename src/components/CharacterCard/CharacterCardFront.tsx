import React, { useState } from "react";

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
  hidden?: boolean;
}

const CharacterCardFront: React.FC<CharacterCardFrontProps> = ({
  character,
  hidden,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const initials =
    character.nome
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("") || "?";
  return (
    <div className="card-front" aria-hidden={hidden}>
      {/* Container da Imagem */}
      <div className="image-container">
        {character.imagem?.trim() && !imageFailed ? (
          // Remote portraits have arbitrary sources; keep a native image with an error fallback.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={character.imagem}
            alt={character.nome}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="image-placeholder"
            role="img"
            aria-label={`Foto não disponível para ${
              character.nome ?? "este personagem"
            }`}
          >
            <span className="avatar-initials" aria-hidden="true">
              {initials}
            </span>
            <span>Foto não disponível</span>
          </div>
        )}
      </div>

      {/* Container de Informações */}
      <div className="info-container">
        <h2>{character.nome}</h2>
        {character.casa && <p>Casa: {character.casa}</p>}
        {character.patrono && <p>Patrono: {character.patrono}</p>}
        {character.dataDeNascimento && (
          <p>Data de Nascimento: {character.dataDeNascimento}</p>
        )}
        {character.ator && <p>Ator: {character.ator}</p>}
      </div>
    </div>
  );
};

export default CharacterCardFront;
