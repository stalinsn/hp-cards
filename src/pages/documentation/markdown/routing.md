# Routing.md

## Visão Geral

Esta documentação aborda o sistema de roteamento da aplicação Next.js. O roteamento é uma parte essencial para a navegação do usuário, permitindo o acesso a diferentes páginas e recursos de maneira eficiente e organizada. A aplicação utiliza a estrutura de roteamento do Next.js, baseada em arquivos, onde cada arquivo dentro da pasta `pages` representa uma rota única.

## Estrutura de Roteamento

### 1. `pages/index.tsx`

#### Descrição
- **Rota Principal**: Este arquivo representa a rota raiz da aplicação (`/`). Ele é responsável pela exibição da página principal da aplicação, onde são listados todos os personagens com as funcionalidades de busca, filtragem por categorias e paginação.
  
#### Funcionalidades
- **Exibição de Personagens**: Mostra uma lista paginada de personagens.
- **Busca e Filtro**: Inclui a barra de busca e os filtros por categoria para encontrar personagens específicos.
- **Navegação e Interatividade**: Integra todos os componentes principais (`SearchBar`, `CategoryFilter`, `CharacterCard`, `Pagination`, e `BackToTop`) para uma experiência de usuário interativa e fluida.

### 2. `pages/documentation/*.md`

#### Descrição
- **Rota de Documentação**: A pasta `documentation` dentro de `pages` contém arquivos Markdown que documentam a aplicação. Estes arquivos são renderizados como páginas individuais, permitindo que os usuários visualizem a documentação diretamente no navegador.

#### Funcionalidades
- **Documentação Estruturada**: Cada arquivo `.md` representa uma seção da documentação (e.g., `README.md`, `api.md`, `components.md`, `routing.md`, etc.).
- **Acesso Direto**: Os usuários podem acessar a documentação diretamente pela rota `/documentation/[nome-do-arquivo]`.

### 3. Rota Dinâmica

#### Descrição
- **Padrões de Roteamento Dinâmico**: Next.js suporta rotas dinâmicas, mas atualmente esta aplicação não possui páginas dinâmicas específicas com parâmetros de rota, como `[id].tsx`. No entanto, o projeto pode ser facilmente expandido para incluir rotas dinâmicas, por exemplo, para detalhes de personagens individuais.

### 4. Rota API (`pages/api/*`)

#### Descrição
- **Rota de API**: A pasta `pages/api` é usada para definir os endpoints de API que podem ser utilizados pela aplicação.
  
#### Funcionalidades
- **APIs Internas**: Essas rotas permitem a interação do front-end com o back-end diretamente dentro do ambiente do Next.js, simplificando a arquitetura e facilitando a comunicação de dados.
- **Exemplo Atual**: `/api/graphql` — Endpoint que simula uma API GraphQL para buscar dados de personagens.

## Como o Roteamento Funciona

### Roteamento Baseado em Arquivos

O Next.js utiliza um sistema de roteamento baseado em arquivos, onde cada arquivo em `pages` automaticamente se torna uma rota acessível na aplicação:

- **`pages/index.tsx`** → `/`
- **`pages/documentation/api.md`** → `/documentation/api`
- **`pages/documentation/components.md`** → `/documentation/components`
- **`pages/api/graphql.ts`** → `/api/graphql`

### Navegação entre Páginas

- **Links Internos**: Para navegação entre páginas internas, o componente `Link` do Next.js deve ser utilizado, garantindo transições suaves e mantendo o comportamento de SPA (Single Page Application).
  

import Link from 'next/link';

<Link href="/documentation/api">
  <a>Ver API Documentation</a>
</Link>
### Navegação Programática

- **Navegação Programática**: Utilizando o hook `useRouter` do Next.js, é possível navegar programaticamente dentro da aplicação.


import { useRouter } from 'next/router';

const router = useRouter();
const navigateTo = () => router.push('/documentation/components');

## Considerações de Manutenção

### Expansão de Rotas

- **Novas Páginas**: Para adicionar novas páginas, crie um novo arquivo dentro da pasta `pages`. Se a página necessitar de parâmetros dinâmicos (como um ID de personagem), utilize colchetes na nomeação do arquivo, por exemplo, `[id].tsx`.
- **Expansão de API**: Rotas adicionais de API podem ser adicionadas dentro de `pages/api` para novas funcionalidades de back-end.

### Melhores Práticas

- **SEO e Acessibilidade**: Utilize os componentes `Head` do Next.js para gerenciar tags meta e títulos, otimizando o SEO e a acessibilidade da aplicação.
- **Lazy Loading e Otimização**: Utilize o carregamento preguiçoso (`dynamic import`) para carregar componentes ou rotas apenas quando necessário, melhorando o desempenho da aplicação.

### Monitoramento de Erros

- **Fallbacks e Tratamento de Erros**: Utilize páginas de erro personalizadas (`_error.tsx` ou `_404.tsx`) para gerenciar erros de rota ou páginas inexistentes.
- **Redirecionamentos**: Configure redirecionamentos no arquivo `next.config.js` para garantir uma melhor experiência de usuário.

## Conclusão

O sistema de roteamento da aplicação é simples e direto, utilizando a estrutura padrão do Next.js. Seguindo essas práticas e diretrizes, a aplicação permanecerá escalável, fácil de manter e otimizada para o desempenho.
