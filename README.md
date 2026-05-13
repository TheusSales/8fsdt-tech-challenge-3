# 8fsdt-tech-challenge-3

Front-end do **Tech Challenge — Fase 3** da FIAP. Aplicação de blogging
desenvolvida em React, que consome a API REST construída na
[Fase 2](https://github.com/TheusSales/8fsdt-tech-challenge-2).

## Visão geral

A aplicação permite:

- Listar e ler posts (público)
- Buscar posts por palavras-chave
- Criar, editar e excluir posts via painel administrativo

Não há login nem comentários — a API atual não expõe esses recursos.

## Stack

- **React 18** — hooks e componentes funcionais
- **TypeScript** — tipagem estática
- **Vite 5** — bundler e dev server
- **Styled Components 6** — estilização com tema centralizado

## Pré-requisitos

- Node.js 18+
- npm
- API da Fase 2 rodando em `http://localhost:3000`
  (ver [back-end](https://github.com/TheusSales/8fsdt-tech-challenge-2))

## Como rodar

```bash
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

## Scripts

| Comando           | Função                                       |
|-------------------|----------------------------------------------|
| `npm run dev`     | Servidor de desenvolvimento com hot reload   |
| `npm run build`   | Build de produção em `dist/`                 |
| `npm run preview` | Servir localmente o build de produção        |

## Estrutura

```
src/
  components/   # componentes reutilizáveis (design system)
  pages/        # páginas / rotas da aplicação
  hooks/        # hooks customizados
  services/     # integração com a API REST
  styles/       # tema e estilos globais (Styled Components)
  types/        # tipos compartilhados
docs/
  wireframes.md # wireframes de baixa fidelidade das telas
```

## Arquitetura do front-end

A organização segue o padrão **separação por responsabilidade**:

- **`styles/theme.ts`** centraliza os *tokens* do design system (cores,
  espaços, tipografia, breakpoints, sombras). Tudo o que é visual no app
  consulta esse arquivo — alterar uma cor aqui propaga para o app inteiro.
- **`styles/global.ts`** define o reset CSS e estilos globais (fonte, fundo,
  reset de margens).
- **`styles/styled.d.ts`** tipa o tema do Styled Components, dando
  autocomplete em `${({ theme }) => theme.colors.primary}` etc.
- **`components/`** contém os componentes do design system. São genéricos,
  sem regra de negócio. Cada arquivo exporta um componente.
- **`pages/`** (a vir) — composição dos componentes em telas inteiras.
- **`services/`** (a vir) — funções que falam com a API REST. Toda chamada
  HTTP fica encapsulada aqui.

### Design system (atual)

Componentes base em `src/components/`:

- **`Button`** — variantes `primary`, `secondary`, `danger`. Suporta todos
  os atributos nativos de `<button>` e tem foco visível para teclado.
- **`Input`** e **`Textarea`** — `<label>` associado via `useId` (acessível
  por leitores de tela).
- **`Card`** — caixa com fundo destacado e borda; usada para agrupar conteúdo.
- **`Container`** — wrapper centralizado com `max-width` de 960px e
  padding responsivo.
- **`Header`** — header global com brand e links de navegação.

Para visualizar todos os componentes em ação, rode `npm run dev` — a tela
inicial atual é um "kitchen sink" do design system.

## Wireframes

Os esboços de baixa fidelidade das 5 telas estão em
[`docs/wireframes.md`](docs/wireframes.md), incluindo:

- Lista de posts (`/`)
- Leitura de post (`/posts/:id`)
- Painel administrativo (`/admin`)
- Criar post (`/admin/posts/novo`)
- Editar post (`/admin/posts/:id/editar`)

## Integração com a API

A API REST consumida é a do Tech Challenge — Fase 2:

| Método  | Endpoint                  | Função                         |
|---------|---------------------------|--------------------------------|
| GET     | `/posts`                  | Listar todos os posts          |
| GET     | `/posts/:id`              | Detalhe de um post             |
| GET     | `/posts/search?q=termo`   | Buscar posts por palavra-chave |
| POST    | `/posts`                  | Criar um post                  |
| PUT     | `/posts/:id`              | Editar um post                 |
| DELETE  | `/posts/:id`              | Excluir um post                |

Payload de criação/edição:

```json
{
  "titulo": "string",
  "conteudo": "string",
  "autor": "string"
}
```

A base URL é configurável via variável de ambiente `VITE_API_URL`
(padrão: `http://localhost:3000`).

## Roadmap

- [x] Estrutura inicial com Vite + TypeScript + Styled Components
- [x] Wireframes das telas
- [x] Design system base (tokens + componentes essenciais)
- [ ] Roteamento (React Router) e páginas com placeholders
- [ ] Camada de serviços (cliente HTTP da API)
- [ ] Implementação das telas reais
- [ ] Responsividade refinada (mobile)
- [ ] Dockerfile + workflow de CI/CD
- [ ] Documento de arquitetura final e relato de experiências
