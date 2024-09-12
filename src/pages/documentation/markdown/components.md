# Components.md

## Visão Geral

Esta documentação abrange a estrutura e funcionalidades dos componentes da aplicação, detalhando como cada componente interage dentro da aplicação React/Next.js, os padrões adotados e as melhores práticas para manutenção e expansão futura.

## Estrutura de Componentes

### 1. `CharacterCard`

#### Descrição
O componente `CharacterCard` representa um cartão de personagem que exibe informações detalhadas de um personagem, como nome, casa, imagem, e atributos específicos. Este componente é responsável por apresentar a interface visual para cada personagem, incluindo a funcionalidade de "flip" para exibir mais detalhes no verso do cartão.

#### Propriedades
- **`character`**: Objeto do tipo `Personagem` contendo todos os detalhes do personagem.
- **`cardClass`**: String usada para aplicar a classe CSS correspondente à casa do personagem.

#### Funcionalidades
- **Flip do Card**: O componente utiliza um estado interno (`flipped`) para alternar entre o lado frontal e traseiro do cartão ao clicar.
- **Responsividade**: Adaptado para diferentes tamanhos de tela, mantendo a consistência visual entre dispositivos.

#### Interações
- O `CharacterCard` depende de dois subcomponentes: `CharacterCardFront` e `CharacterCardBack`, que representam, respectivamente, o lado frontal e o verso do cartão.

#### Considerações de Manutenção
- Certifique-se de que as informações do personagem sejam sempre atualizadas e consistentes.
- Manter o CSS modularizado e bem estruturado para facilitar ajustes visuais.
- Verifique a lógica de "flip" e transições CSS para evitar glitches visuais.

### 2. `CharacterCardFront`

#### Descrição
`CharacterCardFront` exibe a parte frontal do cartão de personagem, mostrando principalmente a imagem e o nome do personagem.

#### Propriedades
- **`character`**: Objeto do tipo `Personagem` contendo todos os detalhes necessários para exibição.

#### Funcionalidades
- **Renderização Condicional de Imagem**: Exibe um avatar padrão (SVG) caso a imagem do personagem não esteja disponível.

#### Interações
- Este componente é utilizado dentro de `CharacterCard` e depende do objeto `character` para renderizar as informações.

#### Considerações de Manutenção
- Verifique as imagens carregadas para garantir que estejam otimizadas e corretamente dimensionadas.
- Atualize o SVG de avatar conforme necessário para atender às diretrizes de design.

### 3. `CharacterCardBack`

#### Descrição
`CharacterCardBack` exibe a parte traseira do cartão de personagem, mostrando atributos adicionais como data de nascimento, ator, patrono, etc.

#### Propriedades
- **`character`**: Objeto do tipo `Personagem` contendo todos os detalhes necessários para exibição.

#### Funcionalidades
- **Renderização de Atributos**: Lista atributos detalhados do personagem, utilizando renderização condicional para garantir que apenas informações disponíveis sejam mostradas.

#### Interações
- Este componente é utilizado dentro de `CharacterCard` para mostrar informações detalhadas quando o cartão é "virado".

#### Considerações de Manutenção
- Mantenha a lógica de renderização condicional clara para evitar exibições incorretas.
- Atualize os estilos conforme necessário para garantir legibilidade e consistência.

### 4. `CategoryFilter`

#### Descrição
`CategoryFilter` permite filtrar personagens por categoria, como as casas de Hogwarts (Grifinória, Sonserina, etc.).

#### Propriedades
- **`selectedHouse`**: String indicando a casa atualmente selecionada para filtragem.
- **`onSelectHouse`**: Função callback acionada ao selecionar uma casa diferente.

#### Funcionalidades
- **Filtro de Categoria**: Gera dinamicamente botões de filtro para cada casa e aplica estilos de seleção.

#### Interações
- Interage diretamente com o estado da `HomePage` para atualizar a lista de personagens exibidos com base na casa selecionada.

#### Considerações de Manutenção
- Assegure-se de que todos os filtros estejam funcionando corretamente e de que o design seja responsivo para diferentes tamanhos de tela.
- Atualize os estilos para manter a consistência visual com o restante da aplicação.

### 5. `SearchBar`

#### Descrição
`SearchBar` é um componente de barra de busca que permite ao usuário procurar personagens por nome.

#### Propriedades
- **`onSearch`**: Função callback acionada quando uma busca é realizada.
- **`resetSearch`**: Função callback usada para resetar a busca.
- **`showError`**: Booleano que controla a exibição de mensagens de erro.

#### Funcionalidades
- **Busca por Nome**: Realiza buscas após 3 segundos de inatividade ou ao pressionar "Enter".
- **Exibição de Erro**: Mostra uma mensagem de erro ("tooltip") quando nenhum resultado é encontrado.

#### Interações
- Interage diretamente com o estado da `HomePage` para filtrar personagens com base no nome digitado.

#### Considerações de Manutenção
- Garanta que a experiência do usuário seja suave e que a lógica de busca esteja funcionando conforme esperado.
- Otimize a renderização e o uso de estados para evitar re-renderizações desnecessárias.

### 6. `Pagination`

#### Descrição
`Pagination` controla a navegação entre diferentes páginas de resultados de personagens.

#### Propriedades
- **`currentPage`**: Página atual.
- **`totalPages`**: Total de páginas disponíveis.
- **`onPageChange`**: Função callback acionada ao mudar de página.

#### Funcionalidades
- **Navegação**: Fornece botões para navegar para a próxima página, página anterior, e seleciona diretamente uma página específica.
- **Responsividade**: Em versões móveis, exibe a barra de paginação de forma flutuante no lado direito da tela.

#### Interações
- Controla a navegação de páginas na `HomePage`, atualizando o estado de acordo com a seleção de página.

#### Considerações de Manutenção
- Verifique a lógica de paginação para garantir que o número de páginas seja corretamente calculado e exibido.
- Assegure que a barra de paginação esteja sempre visível em dispositivos móveis para melhorar a navegabilidade.

### 7. `BackToTop`

#### Descrição
`BackToTop` é um botão flutuante que permite ao usuário voltar ao topo da página com um clique.

#### Funcionalidades
- **Scroll para o Topo**: Usa `window.scrollTo` para retornar ao topo da página suavemente.

#### Interações
- É exibido quando o usuário rola para baixo na página e desaparece quando o usuário está no topo.

#### Considerações de Manutenção
- Verifique a posição e o comportamento do botão em diferentes tamanhos de tela para garantir que não interfira com outros elementos interativos.
- Assegure-se de que a animação de rolagem seja suave e responsiva.

## Padrões de Criação de Componentes

- **Atomic Design**: Componentes são construídos seguindo o padrão de Atomic Design, de componentes menores e reutilizáveis (átomos) para componentes maiores e mais complexos (moléculas e organismos).
- **CSS Modules**: Utilização de CSS Modules para garantir o escopo local de estilos e evitar conflitos de nomes de classe.
- **Responsividade**: Todos os componentes devem ser responsivos, adaptando-se bem a diferentes dispositivos e tamanhos de tela.
- **Acessibilidade**: Uso de atributos ARIA e boas práticas de acessibilidade, garantindo que a aplicação seja utilizável por todos.

## Fluxo de Navegação

1. **Busca e Filtros**: O usuário inicia a navegação utilizando a barra de busca ou filtros de categoria para encontrar personagens específicos.
2. **Visualização de Resultados**: Personagens filtrados são exibidos em cartões, permitindo ao usuário visualizar informações rápidas.
3. **Detalhamento e Paginação**: O usuário pode virar os cartões para ver mais detalhes e usar a paginação para navegar entre diferentes páginas de resultados.
4. **Voltar ao Topo**: Se necessário, o usuário pode usar o botão `BackToTop` para retornar rapidamente ao topo da página.

## Conclusão

A estrutura de componentes foi projetada para ser modular, reutilizável e fácil de manter. Seguir esses padrões ajudará a garantir que a aplicação continue escalável e fácil de atualizar no futuro.
