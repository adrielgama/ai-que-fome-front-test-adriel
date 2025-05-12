# Projeto: Mobile Restaurant Ordering App (Desafio Técnico Aiqfome)

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de **Engenheiro(a) de Software Front-End Sênior (React e Next.js)** da **L2L Aiqfome**, com foco em experiência mobile, fluidez de interface e uso otimizado de Server Components.

## Objetivo

Uma aplicação web responsiva que simula a experiência de um usuário selecionando produtos em restaurantes, adicionando ao "ticket" (carrinho) e finalizando a compra. O sistema simula a jornada de um pedido real com persistência local e regras de negócio personalizadas, como mínimo de pedido e frete grátis.

## Funcionalidades Principais

- Listagem de produtos organizados por categoria.
- Página de detalhes do produto com opções dinâmicas (tamanho, bebida, talheres, adicionais).
- Adição de produtos ao "ticket" com controle preciso de quantidade e variações.
- Visualização, edição e exclusão de itens no ticket.
- Validação de pedido mínimo e cálculo dinâmico de frete com base em regras da loja.
- Deep linking (ex: `/restaurant/matsuri-concept/1?edit=UUID`) para edição direta do produto.
- Compartilhamento direto do restaurante via URL para facilitar navegação entre usuários.
- Persistência no `localStorage` para restaurante e ticket.
- Otimizações para mobile (interações, carregamento, performance).
- Ícones personalizados desenvolvidos manualmente como componentes React, integrados ao design system do projeto.

## Tecnologias e Bibliotecas

### Frameworks e Core

- **Next.js 15** – com uso extensivo de App Router e Server Components para SSR otimizado.
- **React 19** – hooks como `useMemo`, `useCallback` com boa separação de responsabilidades.
- **TypeScript** – segurança de tipos em toda a aplicação.

### UI/Estilo

- **Tailwind CSS v4** – com `prettier-plugin-tailwindcss` e `tailwind-merge` para consistência.
- **ShadCN UI** – base para componentes reutilizáveis como `Skeleton`, `Input`, `Button`, `Textarea`, `Dropdown`, `Accordion`, `Checkbox`, etc.
- **Lucide React** – ícones modernos e leves.

### Estado e Lógica

- **Zustand** – gerenciamento de estado global para ticket, restaurante e ações pendentes no footer.
- **Lodash** – debounce e helpers utilitários.
- **uuid** – geração de IDs únicos (substituindo `crypto.randomUUID()` por compatibilidade cross-browser).

### Code Quality

- ESLint (com `eslint-config-next`, `prettier`, `tailwindcss`, `import`, `react`)
- Prettier com plugin oficial do Tailwind.

### Outros

- **@bprogress/next** – barra de progresso para navegação (UX suave).
- **Dynamic Imports com `next/dynamic`** – carregamento lazy de componentes pesados e skeletons SSR-ready.

## Regras de Negócio Implementadas

- Frete grátis quando `subtotal >= valor para entrega grátis`
- Pedido mínimo validado antes de habilitar botão de pagamento (`restaurant.minimumOrder`)
- Todos os preços adicionais são calculados por unidade selecionada (bebidas, talheres, extras).

## Deep Linking (Links Inteligentes)

A página de detalhes do produto suporta edição direta com o parâmetro `edit` na URL. Exemplo:

```
/restaurant/matsuri-concept/1?edit=9ab23e1c-89f5-4a6d
```

Esse link carrega automaticamente o produto com os dados previamente inseridos no ticket (armazenados no `sessionStorage`) para edição fluida.

```
/restaurant/matsuri-concept
```

Também é possível compartilhar diretamente a URL de um restaurante, permitindo o redirecionamento direto para a página de produtos da loja correspondente.

## Persistência Local

- **`localStorage`**: utilizado para armazenar os dados do ticket (`restaurant-ticket`) e do restaurante atual (`restaurant-data`), garantindo persistência entre sessões mesmo após fechamento do navegador.

## Como rodar o projeto

1. Clone este repositório

```bash
git clone https://github.com/adrielgama/ai-que-fome-front-test-adriel.git
cd ai-que-fome-front-test-adriel
```

2. Instale as dependências

```bash
pnpm # ou npm install
```

3. Rode o servidor local

```bash
pnpm dev # ou npm run dev
```

4. Acesse via navegador:

```
http://localhost:3000
```

## Considerações Finais

Este projeto foi desenvolvido com foco total em:

- Performance e experiência mobile;
- Arquitetura baseada em Server Components;
- Separação clara entre lógicas (hooks, stores, componentes);
- Design limpo, fluido e intuitivo.

Sinta-se à vontade para revisar cada parte do código e explorar os fluxos implementados. Obrigado pela oportunidade!
