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
- **React Router 6** — roteamento client-side
- **TypeScript** — tipagem estática
- **Vite 5** — bundler e dev server
- **Styled Components 6** — estilização com tema centralizado

## Pré-requisitos

- Node.js 18+
- npm
- API da Fase 2 rodando em `http://localhost:3000`
  (ver [back-end](https://github.com/TheusSales/8fsdt-tech-challenge-2))

## Como rodar

1. Suba o back-end da Fase 2 em `http://localhost:3000`.
2. (Opcional) Copie o arquivo de exemplo de ambiente:
   ```bash
   cp .env.example .env
   ```
   E ajuste `VITE_API_URL` se a API estiver em outro endereço.
3. Instale dependências e inicie o dev server:
   ```bash
   npm install
   npm run dev
   ```

A aplicação fica disponível em `http://localhost:5173`.

> ⚠ Se as chamadas à API falharem com erro de CORS, habilite o CORS no
> back-end permitindo a origem do front (`http://localhost:5173`).

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
- **`pages/`** — composição dos componentes em telas inteiras. Cada arquivo
  corresponde a uma rota da aplicação.
- **`services/`** — funções que falam com a API REST. `api.ts` é um wrapper
  fino sobre `fetch` (prefixa a base URL, envia JSON, lança em erros HTTP);
  `posts.ts` exporta uma função por endpoint.
- **`hooks/`** — hooks customizados (`useDebounce` para a busca).
- **`types/`** — tipos compartilhados (`Post`, `PostInput`).

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

## Rotas

| Caminho                       | Página       | Descrição                       |
|-------------------------------|--------------|---------------------------------|
| `/`                           | `PostsList`  | Lista pública de posts + busca  |
| `/posts/:id`                  | `PostDetail` | Leitura de um post              |
| `/admin`                      | `Admin`      | Painel administrativo           |
| `/admin/posts/novo`           | `PostCreate` | Formulário de criação           |
| `/admin/posts/:id/editar`     | `PostEdit`   | Formulário de edição            |
| `*`                           | `NotFound`   | Página 404                      |

As páginas consomem os endpoints reais da API. Cada uma trata seus próprios
estados de `loading` e `error` localmente — não há estado global por
enquanto, mas há espaço para introduzir Context API se a necessidade
aparecer.

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

## Docker

A aplicação tem um `Dockerfile` *multi-stage*: a primeira etapa usa
`node:20-alpine` para fazer o build do Vite e a segunda usa `nginx:alpine`
para servir o `dist/` resultante. O Nginx é configurado com fallback de SPA
(`try_files $uri /index.html`), então rotas client-side como `/posts/:id` e
`/admin/posts/novo` continuam funcionando após refresh.

Como `VITE_API_URL` é injetada **em tempo de build** pelo Vite, ela é
passada via `--build-arg` (com `http://localhost:3000` como padrão):

```bash
# Build com a URL padrão da API
docker build -t tech-challenge-3 .

# Build apontando para outro back-end
docker build \
  --build-arg VITE_API_URL=https://api.exemplo.com \
  -t tech-challenge-3 .

# Servir em http://localhost:8080
docker run --rm -p 8080:80 tech-challenge-3
```

## CI

O workflow `.github/workflows/ci.yml` roda em todo push e PR para `main`:

1. `npm ci` — instala dependências (com cache do `~/.npm`)
2. `npx tsc -b` — checagem de tipos
3. `npm run build` — build do Vite
4. `docker build` — valida que o `Dockerfile` continua íntegro

Não há testes nem lint configurados ainda; o pipeline existe para garantir
que o projeto compila e que a imagem Docker continua *buildável*.

## Roadmap

- [x] Estrutura inicial com Vite + TypeScript + Styled Components
- [x] Wireframes das telas
- [x] Design system base (tokens + componentes essenciais)
- [x] Roteamento (React Router) e páginas com placeholders
- [x] Camada de serviços (cliente HTTP da API)
- [x] Implementação das telas reais (CRUD + busca)
- [x] Dockerfile + workflow de CI/CD
- [ ] Responsividade refinada (mobile)
- [ ] Documento de arquitetura final e relato de experiências
