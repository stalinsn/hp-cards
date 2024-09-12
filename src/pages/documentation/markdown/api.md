# Documentação da API

## Visão Geral

Este arquivo fornece uma visão geral das interações da aplicação com a API, incluindo detalhes sobre as consultas (queries) e mutações (mutations) GraphQL, e como a aplicação utiliza essas interações para gerenciar dados, como os personagens do universo de Harry Potter. A integração foi desenvolvida para ser modular e extensível, facilitando a adição de novas funcionalidades ou modificações nas existentes.

## Estrutura da API

A aplicação se comunica principalmente com uma API GraphQL para buscar dados dos personagens. Esta API é responsável por fornecer informações detalhadas dos personagens, como nome, casa, data de nascimento, ator que interpreta o personagem, entre outros detalhes.

### 1. **Configuração da API GraphQL**

- **Endpoint da API**: `/api/graphql`
  - Este é o endpoint onde todas as requisições GraphQL são enviadas.
  - As consultas e mutações são feitas através de requisições `POST` com o payload em formato JSON.

### 2. **Consultas (Queries) Disponíveis**

#### **Buscar Personagens**

Consulta principal utilizada para obter uma lista de personagens com seus detalhes.

**Query:**
```graphql
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

### Parâmetros de Retorno

- **`id`**: Identificador único do personagem.
- **`nome`**: Nome do personagem.
- **`casa`**: Casa a qual o personagem pertence.
- **`dataDeNascimento`**: Data de nascimento do personagem.
- **`ator`**: Ator que interpreta o personagem.
- **`patrono`**: Patrono do personagem (se aplicável).
- **`especie`**: Espécie do personagem (ex: humano, elfo).
- **`genero`**: Gênero do personagem.
- **`bruxo`**: Indica se o personagem é um bruxo (`boolean`).
- **`vivo`**: Indica se o personagem está vivo (`boolean`).
- **`varinha`**: Detalhes sobre a varinha do personagem:
  - **`madeira`**: Tipo de madeira da varinha.
  - **`nucleo`**: Núcleo da varinha.
  - **`comprimento`**: Comprimento da varinha.
- **`imagem`**: URL da imagem do personagem.

### 3. Funcionalidades da API

#### 1. Busca de Personagens

A aplicação permite a busca de personagens com base em diferentes critérios:

- **Busca por Nome**: Realizada através da barra de pesquisa, que filtra os personagens por nome após digitar três ou mais caracteres.
- **Filtragem por Categoria**: Permite filtrar personagens com base na casa a qual pertencem (Grifinória, Sonserina, Lufa-Lufa, Corvinal).
- **Paginação**: A API suporta a funcionalidade de paginação, possibilitando a navegação entre diferentes páginas de resultados.

#### 2. Gerenciamento de Erros

A aplicação implementa tratamento de erros robusto para lidar com diferentes cenários:

- **Erro de Consulta**: Exibição de uma mensagem de erro quando a consulta falha ao buscar personagens.
- **Erro de Pesquisa**: Exibição de uma mensagem de "Nenhum resultado encontrado" quando a busca por nome não encontra nenhum personagem correspondente.
- **Timeout de Busca**: Reseta a barra de busca e exibe o estado anterior após 10 segundos sem interações.

### 4. Melhorias e Manutenções Futuras

Para facilitar futuros upgrades e manutenções, considere as seguintes sugestões:

- **Modularização das Consultas**: Considere criar arquivos dedicados para diferentes queries e mutations, centralizando a lógica de API e facilitando futuras expansões.
- **Cacheamento de Requisições**: Implementar um mecanismo de cacheamento de dados para reduzir chamadas redundantes à API e melhorar o desempenho da aplicação.
- **Documentação Detalhada**: Mantenha uma documentação detalhada e atualizada sobre todas as consultas e mutações, incluindo exemplos de payloads e respostas.
- **Monitoramento de Erros**: Adicionar monitoramento e logging para capturar erros de API e falhas de rede, facilitando a identificação e correção de problemas.
- **Autenticação e Autorização**: Caso a aplicação cresça em complexidade, considere adicionar autenticação e autorização para proteger certas queries e mutations.

### 5. Boas Práticas de Desenvolvimento com APIs

- **Uso de Fragments no GraphQL**: Utilize fragments para evitar a repetição de campos em diferentes queries.
- **Paginação com `cursor-based`**: Para grandes volumes de dados, considere a implementação de paginação baseada em cursores em vez de `offset-based`, aumentando a eficiência e escalabilidade.
- **Tratamento de Erros de Rede**: Adicione mensagens de erro amigáveis e instruções para o usuário final em casos de falha de rede ou indisponibilidade de serviço.
- **Versionamento da API**: Mantenha um controle de versão na API para garantir a compatibilidade com clientes que possam usar versões anteriores.

## Conclusão

Esta documentação de API deve servir como guia para entender as interações entre o frontend e a API GraphQL da aplicação. A manutenção de uma estrutura modular, uso de boas práticas de desenvolvimento e constante atualização da documentação são essenciais para garantir a escalabilidade e sustentabilidade do projeto a longo prazo.
