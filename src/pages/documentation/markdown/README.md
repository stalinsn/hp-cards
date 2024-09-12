# Projeto Base: Documentação de Aplicação Next.js com VTEX IO

## Visão Geral

Este repositório contém a estrutura de uma aplicação desenvolvida utilizando **Next.js** com integração ao **VTEX IO**, focada em fornecer uma base sólida para o desenvolvimento de aplicações React voltadas para o comércio eletrônico. A aplicação está organizada de maneira modular, com uma estrutura clara e bem definida para componentes, estilos, rotas e interações com APIs.

## Estrutura do Projeto

A aplicação é estruturada de forma a maximizar a reutilização de código e facilitar a manutenção e a escalabilidade. A seguir, a estrutura geral das principais pastas e arquivos do projeto:

### 1. `src/pages`

- **`index.tsx`**: Página inicial, onde ocorre a renderização principal dos componentes e a gestão dos estados principais, como personagens, paginação e filtros.
- **`documentation/`**: Pasta onde está armazenada toda a documentação do projeto.
  - **`markdown/`**: Documentação em Markdown explicando os componentes, estilos, APIs, e rotas.
  - **`swagger/`**: Documentação estilo Swagger, fornecendo uma visão detalhada das APIs.

### 2. `src/components`

- **`CharacterCard/`**: Componente que lida com a exibição das informações dos personagens. Ele está dividido em:
  - **`CharacterCard.tsx`**: Lógica principal do componente, lidando com o flip das cartas.
  - **`CharacterCardFront.tsx`**: Parte da frente do card com informações e imagem.
  - **`CharacterCardBack.tsx`**: Parte de trás do card com informações adicionais.
- **`SearchBar.tsx`**: Barra de busca interativa, permitindo filtrar os personagens por nome.
- **`Pagination.tsx`**: Componente de paginação, permitindo navegação entre diferentes páginas de resultados.
- **`CategoryFilter.tsx`**: Filtro por categorias (casas de Hogwarts), permitindo a seleção dos personagens baseados em categorias específicas.
- **`BackToTop.tsx`**: Botão flutuante para rolar a página até o topo, especialmente útil em dispositivos móveis.

### 3. `src/styles`

- **`_design-system.scss`**: Arquivo contendo todas as variáveis de design (cores, fontes, espaçamentos), que são reutilizadas em todo o projeto.
- **`_cards.scss`**: Estilos específicos para os componentes de card, incluindo a animação de flip e ajustes visuais.
- **`_filter.scss`**: Estilos para os filtros de categoria, com responsividade ajustada para diferentes tamanhos de tela.
- **`_pagination.scss`**: Estilos personalizados para a barra de paginação, com destaque para a página atual e efeitos de hover e clique.

### 4. `src/api`

- **`/graphql/`**: Configurações e queries GraphQL utilizadas para buscar os dados dos personagens e outras interações com a VTEX IO.

## Principais Funcionalidades

- **Renderização de Personagens**: Renderização dinâmica de personagens de uma API GraphQL, com informações detalhadas e interativas em cards.
- **Paginação e Filtro**: Paginação eficiente e filtragem avançada por nome e categorias (casas de Hogwarts).
- **Responsividade**: Design responsivo, garantindo uma experiência de usuário otimizada tanto em desktop quanto em dispositivos móveis.
- **Componentes Modulares**: Cada funcionalidade principal é encapsulada em um componente React, facilitando a reutilização e a manutenção.
- **Integração com VTEX IO**: Preparado para integração com a plataforma de e-commerce VTEX IO, permitindo fácil adaptação para projetos comerciais.

## Estrutura de Documentação

A documentação do projeto está dividida em duas partes principais:

1. **Markdown**: Documentação que descreve cada parte da aplicação, explicando a estrutura, lógica e estilo.
2. **Swagger**: Documentação voltada para APIs e interações com o backend, detalhando as queries e mutations utilizadas.

## Contribuição

Contribuições são bem-vindas! Se você encontrar problemas ou tiver sugestões, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
