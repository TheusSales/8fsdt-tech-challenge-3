# 8fsdt-tech-challenge-3

Front-end do **Tech Challenge — Fase 3** da FIAP. Aplicação de blogging
desenvolvida em React, que consome a API REST construída na
[Fase 2](https://github.com/TheusSales/8fsdt-tech-challenge-2).

## Visão geral

A aplicação permite:

- Listar e ler posts (público)
- Buscar posts por palavras-chave
- Criar, editar e excluir posts via painel administrativo (exige login)

A autenticação é **mockada no front-end**, já que a API da Fase 2 não
expõe endpoint de login (ver [Autenticação](#autenticação)).

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
  components/   # componentes reutilizáveis (design system + PrivateRoute)
  contexts/     # contextos React (AuthContext)
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
  fino sobre `fetch` (prefixa a base URL, envia JSON, parseia `{ message }`
  do body em respostas de erro); `posts.ts` exporta uma função por endpoint
  e desempacota o envelope `{ message, post }` retornado por POST/PUT.
- **`contexts/AuthContext.tsx`** — provider + hook `useAuth` que controla
  o estado de autenticação, persistindo o usuário em `localStorage`.
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
- **`Header`** — header global com brand, links de navegação e ações de
  login/logout. Empilha verticalmente em telas `<768px`.
- **`PrivateRoute`** — wrapper de rota que redireciona para `/login`
  quando o usuário não está autenticado, preservando o destino original.

## Rotas

| Caminho                       | Página       | Descrição                       | Auth |
|-------------------------------|--------------|---------------------------------|------|
| `/`                           | `PostsList`  | Lista pública de posts + busca  | —    |
| `/posts/:id`                  | `PostDetail` | Leitura de um post              | —    |
| `/login`                      | `Login`      | Formulário de autenticação      | —    |
| `/admin`                      | `Admin`      | Painel administrativo           | ✅   |
| `/admin/posts/novo`           | `PostCreate` | Formulário de criação           | ✅   |
| `/admin/posts/:id/editar`     | `PostEdit`   | Formulário de edição            | ✅   |
| `*`                           | `NotFound`   | Página 404                      | —    |

As páginas consomem os endpoints reais da API. Cada uma trata seus próprios
estados de `loading` e `error` localmente. Estado compartilhado fica em
Context API (hoje só `AuthContext`).

## Autenticação

O requisito 6 do enunciado pede login para professores e proteção das
páginas de criação/edição/admin. Como a API da Fase 2 **não expõe endpoint
de autenticação**, o login foi implementado de forma mockada no front:

- `AuthContext` valida credenciais contra constantes fixas
  (`professor` / `professor123`) e persiste o usuário em `localStorage`
  para sobreviver a refresh.
- `PrivateRoute` envolve as rotas `/admin/*` e redireciona usuários
  não autenticados para `/login`, guardando a rota original em
  `location.state.from` para que o login devolva o usuário ao destino.
- O `Header` mostra "Entrar" quando deslogado e "Olá, &lt;user&gt; / Sair"
  quando autenticado; o link "Admin" só aparece após login.

> ⚠ Esse mecanismo cumpre o requisito formal mas **não é seguro para
> produção**: credenciais ficam no bundle e não há verificação
> server-side. Quando o back-end ganhar `POST /login` retornando JWT,
> basta substituir a função `login()` do contexto pela chamada real
> e trocar a flag no `localStorage` pelo token.

**Credenciais de demonstração:** `professor` / `professor123`.

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

## Desafios enfrentados

Relato dos principais obstáculos encontrados durante o desenvolvimento e
como cada um foi resolvido. A intenção é registrar o aprendizado, não
fingir que tudo correu liso.

### 1. Contrato da API divergente do esperado

Modelei o tipo `Post` assumindo um schema "padrão" (`id`, `title`,
`content`, `author`). Quando a integração começou, descobri via
DevTools → Network que a API real usa **`idpost`, `titulo`, `conteudo`,
`autor`** — e que `POST /posts` e `PUT /posts/:id` devolvem um envelope
`{ message, post }` em vez do recurso direto. O erro mais frustrante foi
silencioso: o front recebia `undefined` ao tentar acessar `response.id`,
sem nenhum aviso do TypeScript (já que `any` vazava do `fetch`).

**Resolução:** alinhei o tipo `Post` ao contrato real e centralizei
o unwrap do envelope dentro de `services/posts.ts`, mantendo as páginas
ingênuas (recebem `Post` direto).

**Lição:** antes de tipar, sempre inspecionar uma resposta real da API
em vez de assumir convenção. Um Swagger/OpenAPI nessa fase teria evitado
toda a refatoração.

### 2. Mensagens de erro inúteis ao usuário

O wrapper `request()` jogava `response.statusText` em todos os erros, o
que mostrava `"Internal Server Error"` para tudo — informação inútil
para diagnóstico. Acontece que o back devolve um JSON estruturado
(`{ "message": "..." }`) com a causa real.

**Resolução:** o `request()` agora tenta parsear o body do erro como
JSON e usa o campo `message` quando disponível, com fallback para o
`statusText`. Erros que antes apareciam como genéricos viraram coisas
como `"Erro 400: Título excede 255 caracteres"`.

### 3. Validação de tamanho ausente no back-end → erro 500

Ao testar a criação com um título de 300 caracteres, o front recebia
**500 Internal Server Error**. Investigando, o controller do back não
valida tamanho antes de inserir no banco — o Postgres é quem rejeita
com `22001 value too long for type character varying(255)`, e o
`try/catch` engole tudo num "Erro interno do servidor" sem identificar
o campo culpado.

**Resolução:** blindei no front aplicando `maxLength` (255 para
`titulo`/`autor`, 10000 para `conteudo`) e `minLength` (3/2). Isso
elimina o caminho do erro pela UI, embora o back continue vulnerável
para clientes que não respeitem o `maxLength` (Postman, integrações).

**Lição:** validação deve existir nas duas pontas. Front previne erros
óbvios para UX, back impede dados inválidos vindos de qualquer cliente.

### 4. Autenticação sem endpoint de back-end

O requisito 6 pede login para professores, mas a API da Fase 2 não
expõe `/login`, `/users` nem JWT. Eu tinha três opções: implementar
auth no back (fora do escopo desse repositório), usar um provedor
externo (Auth0/Clerk — overkill) ou mockar no front.

**Resolução:** auth mockada com credenciais fixas e flag em
`localStorage`. A arquitetura — `AuthContext` + `PrivateRoute` —
é a mesma que seria usada com JWT real, então a migração é direta
(substituir a função `login()` do contexto por um `fetch` para o
endpoint quando ele existir).

**Lição:** quando uma dependência externa atrasa, vale entregar a
**estrutura** que recebe a versão final, em vez de bloquear o restante
do trabalho. Aqui o front fica pronto para receber JWT sem alterar
nenhuma página.

### 5. Coordenação front × back num projeto multi-fase

Como a Fase 2 (back) e Fase 3 (front) foram desenvolvidas em momentos
diferentes, várias incompatibilidades só apareceram na integração
(itens 1 a 3 deste relato). O ciclo "front pede X → back responde Y →
front ajusta" custou tempo que poderia ter sido economizado com um
contrato documentado desde o início.

**Lição para a próxima fase:** começar definindo o contrato (idealmente
em OpenAPI/Swagger), e usar ele como fonte da verdade para os dois
lados gerarem tipos.

## Roadmap

- [x] Estrutura inicial com Vite + TypeScript + Styled Components
- [x] Wireframes das telas
- [x] Design system base (tokens + componentes essenciais)
- [x] Roteamento (React Router) e páginas com placeholders
- [x] Camada de serviços (cliente HTTP da API)
- [x] Implementação das telas reais (CRUD + busca)
- [x] Dockerfile + workflow de CI/CD
- [x] Autenticação mockada com `AuthContext` + `PrivateRoute`
- [x] Responsividade do header (mobile)
- [x] Documento de arquitetura e relato de experiências (este README)
- [ ] Substituir auth mockada por JWT real quando o back expuser `/login`
