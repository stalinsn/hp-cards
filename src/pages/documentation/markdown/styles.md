# Guia de Estilos (styles.md)

## Visão Geral

O projeto utiliza uma abordagem modular e escalável para o gerenciamento de estilos, combinando SCSS (Sass) com o Design System definido no arquivo `design-system.scss`. A estrutura de estilos é organizada para garantir consistência visual e facilitar a manutenção e expansão dos componentes e páginas.

## Estrutura de Diretórios

src/ │ └── styles/ ├── design-system.scss ├── _base.scss ├── _mixins.scss ├── _variables.scss ├── _components/ │ ├── _cards.scss │ ├── _filter.scss │ ├── _pagination.scss │ └── _search-bar.scss └── _layout.scss


### Descrição dos Arquivos

- **`design-system.scss`**: Define o sistema de design global, contendo variáveis de cores, tipografia, espaçamentos, bordas, transições e sombras. Este arquivo centraliza todas as definições de estilo utilizadas em outros arquivos SCSS.

- **`_base.scss`**: Contém estilos globais básicos aplicados em toda a aplicação, como redefinições de estilos padrão do navegador, estilos de tags HTML (`body`, `a`, `h1`, etc.), e configurações gerais de fontes e cores.

- **`_mixins.scss`**: Define mixins reutilizáveis que encapsulam conjuntos de estilos comuns, facilitando a aplicação de padrões de design consistentes em diferentes componentes.

- **`_variables.scss`**: Armazena todas as variáveis utilizadas no projeto, como cores, tamanhos de fonte, espaçamentos, etc. Este arquivo é importado pelo `design-system.scss` e outros arquivos que necessitem acessar estas variáveis.

### Estrutura de Componentes

- **`_components/`**: Pasta dedicada aos estilos específicos de componentes. Cada arquivo SCSS nesta pasta corresponde a um componente React do projeto. Abaixo, a descrição dos arquivos encontrados:

  - **`_cards.scss`**: Define estilos para o componente de card de personagem, incluindo o efeito de flip, estilos para a frente e verso do card, e a imagem de avatar de placeholder.
  
  - **`_filter.scss`**: Estilos para o componente de filtro de categorias, incluindo a barra de filtro e os botões de categoria. Inclui responsividade para dispositivos móveis.
  
  - **`_pagination.scss`**: Estilos para o componente de paginação, com botões "Anterior" e "Próximo", e navegação entre páginas. Contém regras específicas para responsividade.
  
  - **`_search-bar.scss`**: Estilos para a barra de busca, incluindo o input de texto, ícone de busca e feedback visual para o usuário.

- **`_layout.scss`**: Contém estilos gerais relacionados ao layout da aplicação, como a definição de grids, flexbox, containers e outras regras de posicionamento.

## Padrões de Estilização

### Uso de SCSS

- **Modularidade**: Utiliza arquivos SCSS separados para cada componente, permitindo fácil manutenção e evitando estilos conflitantes.
  
- **Importação**: Todos os arquivos SCSS são importados no `styles.scss`, que é o ponto de entrada para os estilos na aplicação Next.js.


@import 'design-system';
@import 'base';
@import 'mixins';
@import 'variables';
@import 'components/cards';
@import 'components/filter';
@import 'components/pagination';
@import 'components/search-bar';
@import 'layout';


### Design System

- **Variáveis**: Utilize variáveis definidas no `design-system.scss` para cores, tamanhos de fonte, espaçamentos, bordas, etc. Exemplo:

  
  .example-class {
    color: $color-primary;
    padding: $spacing-md;
  }
  

  Mixins e Funções: Utilize mixins e funções para estilos reutilizáveis e consistentes. Exemplo:
  
    @include flex-center;
    background-color: get-house-color('gryffindor');
  

## Boas Práticas

- **Responsividade**: Utilize breakpoints e media queries para adaptar os estilos a diferentes tamanhos de tela, garantindo uma experiência de usuário consistente em todos os dispositivos.

- **Reutilização de Estilos**: Centralize regras de estilo comuns em mixins e funções para evitar redundância e garantir consistência.

- **Nomes Semânticos**: Utilize nomes de classes e IDs semânticos e autoexplicativos para facilitar a leitura e manutenção do código.

- **Otimização de Performance**: Minimize o uso de seletores aninhados e excessivamente específicos. Prefira estilos planos e bem organizados para melhorar a performance do CSS.

## Considerações de Manutenção

- **Adição de Novos Componentes**: Para adicionar estilos de novos componentes, crie um novo arquivo SCSS em `src/styles/components/` e importe-o no `styles.scss`.

- **Alterações no Design System**: Qualquer mudança no design system (`design-system.scss`) deve ser testada para garantir que não afete negativamente outros componentes.

- **Monitoramento de Impactos**: Verifique sempre o impacto de novos estilos nos componentes existentes, especialmente em relação à responsividade e acessibilidade.

## Conclusão

A estrutura de estilos é planejada para garantir escalabilidade, consistência e fácil manutenção. Seguindo as diretrizes e padrões estabelecidos, a aplicação permanecerá organizada e eficiente.
