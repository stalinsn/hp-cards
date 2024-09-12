import { makeExecutableSchema } from '@graphql-tools/schema';

// Definindo o schema com todos os campos traduzidos para português
const typeDefs = `
  type Varinha {
    madeira: String
    nucleo: String
    comprimento: Float  # Altere de Int para Float para permitir números decimais
  }

  type Personagem {
    id: ID
    nome: String
    nomes_alternativos: [String]
    especie: String
    genero: String
    casa: String
    dataDeNascimento: String
    anoDeNascimento: Int
    bruxo: Boolean
    ancestralidade: String
    corDosOlhos: String
    corDoCabelo: String
    varinha: Varinha
    patrono: String
    estudanteDeHogwarts: Boolean
    staffDeHogwarts: Boolean
    ator: String
    atores_alternativos: [String]
    vivo: Boolean
    imagem: String
  }

  type Query {
    personagens: [Personagem]
    personagem(id: ID!): Personagem
  }
`;

// Função para buscar dados da API externa e mapear para o schema
// Função para buscar dados da API externa e mapear para o schema
const fetchCharactersFromAPI = async () => {
    try {
      const response = await fetch('https://hp-api.onrender.com/api/characters');
  
      // Verifica se a resposta da API é bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }
  
      const characters = await response.json();
  
      // Mapeia os dados para o schema GraphQL
      return characters.map((character: any) => ({
        id: character.id,
        nome: character.name,
        nomes_alternativos: character.alternate_names,
        especie: character.species,
        genero: character.gender,
        casa: character.house,
        dataDeNascimento: character.dateOfBirth,
        anoDeNascimento: character.yearOfBirth,
        bruxo: character.wizard,
        ancestralidade: character.ancestry,
        corDosOlhos: character.eyeColour,
        corDoCabelo: character.hairColour,
        varinha: {
          madeira: character.wand.wood,
          nucleo: character.wand.core,
          comprimento: character.wand.length,
        },
        patrono: character.patronus,
        estudanteDeHogwarts: character.hogwartsStudent,
        staffDeHogwarts: character.hogwartsStaff,
        ator: character.actor,
        atores_alternativos: character.alternate_actors,
        vivo: character.alive,
        imagem: character.image,
      }));
    } catch (error) {
      // Verificação para garantir que o erro é um objeto com uma propriedade 'message'
      if (error instanceof Error) {
        console.error('Erro ao buscar personagens da API:', error.message);
      } else {
        console.error('Erro ao buscar personagens da API:', error);
      }
      return [];
    }
  };
  

// Definindo resolvers para as queries
const resolvers = {
  Query: {
    personagens: async () => await fetchCharactersFromAPI(),
    personagem: async (parent: any, args: any) => {
      const characters = await fetchCharactersFromAPI();
      return characters.find((character: any) => character.id === args.id);
    },
  },
};

// Exportando o schema
export const schema = makeExecutableSchema({ typeDefs, resolvers });
