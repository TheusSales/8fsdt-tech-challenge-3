# Wireframes — Tech Challenge 3

Esboços de baixa fidelidade das telas. O objetivo é alinhar a estrutura
visual antes de implementar — não representam o visual final.

Legenda:
- `[Texto]` = botão / link
- `( )` = campo de entrada
- `___` = área de conteúdo / placeholder

---

## 1. Lista de posts — `/`

```
+--------------------------------------------------------------+
|  TECH BLOG                              [ Posts ]  [ Admin ] |
+--------------------------------------------------------------+
|                                                              |
|  Posts recentes                                              |
|  ( buscar por palavra-chave...                            )  |
|                                                              |
|  +--------------------------------------------------------+  |
|  | Título do post 1                                       |  |
|  | por Prof. Fulano                                       |  |
|  | Breve descrição do post, duas linhas no máximo...      |  |
|  |                                              [ Ler > ] |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  | Título do post 2                                       |  |
|  | por Prof. Beltrana                                     |  |
|  | Breve descrição...                                     |  |
|  |                                              [ Ler > ] |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  ... mais posts                                              |
|                                                              |
+--------------------------------------------------------------+
```

Notas:
- A busca consome `GET /posts/search?q=...` (com debounce).
- Quando a busca está vazia, mostra todos os posts via `GET /posts`.
- O card inteiro é clicável e leva para `/posts/:id`.

---

## 2. Leitura de post — `/posts/:id`

```
+--------------------------------------------------------------+
|  TECH BLOG                              [ Posts ]  [ Admin ] |
+--------------------------------------------------------------+
|                                                              |
|  [ < Voltar ]                                                |
|                                                              |
|  Título do post                                              |
|  por Prof. Fulano                                            |
|                                                              |
|  ____________________________________________________        |
|  ____________________________________________________        |
|  Conteúdo completo do post em texto corrido...               |
|  ____________________________________________________        |
|  ____________________________________________________        |
|                                                              |
+--------------------------------------------------------------+
```

Notas:
- Consome `GET /posts/:id`.
- Se o post não existir, mostra mensagem "Post não encontrado" e link para voltar.

---

## 3. Painel administrativo — `/admin`

```
+--------------------------------------------------------------+
|  TECH BLOG                              [ Posts ]  [ Admin ] |
+--------------------------------------------------------------+
|                                                              |
|  Administrar posts                          [ + Novo post ]  |
|                                                              |
|  +--------------------------------------------------------+  |
|  | Título                | Autor       | Ações            |  |
|  |-----------------------|-------------|------------------|  |
|  | Título do post 1      | Fulano      | [ Editar ] [ X ] |  |
|  | Título do post 2      | Beltrana    | [ Editar ] [ X ] |  |
|  | Título do post 3      | Fulano      | [ Editar ] [ X ] |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  ([ X ] excluir pede confirmação antes de chamar DELETE)     |
|                                                              |
+--------------------------------------------------------------+
```

Notas:
- Consome `GET /posts` para listar.
- `Editar` navega para `/admin/posts/:id/editar`.
- `Excluir` abre confirmação inline e chama `DELETE /posts/:id`.

---

## 4. Criar post — `/admin/posts/novo`

```
+--------------------------------------------------------------+
|  TECH BLOG                              [ Posts ]  [ Admin ] |
+--------------------------------------------------------------+
|                                                              |
|  Novo post                                                   |
|                                                              |
|  Título                                                      |
|  (                                                        )  |
|                                                              |
|  Autor                                                       |
|  (                                                        )  |
|                                                              |
|  Conteúdo                                                    |
|  +--------------------------------------------------------+  |
|  |                                                        |  |
|  |                                                        |  |
|  |                                                        |  |
|  +--------------------------------------------------------+  |
|                                                              |
|              [ Cancelar ]                  [ Publicar ]      |
|                                                              |
+--------------------------------------------------------------+
```

Notas:
- `Publicar` chama `POST /posts` com `{ titulo, conteudo, autor }`.
- Em sucesso, redireciona para `/admin`.

---

## 5. Editar post — `/admin/posts/:id/editar`

Mesma estrutura da tela de criação, com os campos pré-preenchidos a partir
de `GET /posts/:id`. Botão final muda para `[ Salvar alterações ]`.

```
+--------------------------------------------------------------+
|  TECH BLOG                              [ Posts ]  [ Admin ] |
+--------------------------------------------------------------+
|                                                              |
|  Editar post                                                 |
|                                                              |
|  Título                                                      |
|  ( Título do post 1                                       )  |
|                                                              |
|  Autor                                                       |
|  ( Prof. Fulano                                           )  |
|                                                              |
|  Conteúdo                                                    |
|  +--------------------------------------------------------+  |
|  | Texto atual do post...                                 |  |
|  |                                                        |  |
|  +--------------------------------------------------------+  |
|                                                              |
|              [ Cancelar ]            [ Salvar alterações ]   |
|                                                              |
+--------------------------------------------------------------+
```

Notas:
- `Salvar alterações` chama `PUT /posts/:id` com `{ titulo, conteudo, autor }`.

---

## Responsividade (mobile)

Em telas estreitas (`< 640px`):
- O header colapsa: brand à esquerda e links empilhados ou em menu simples.
- A tabela do admin vira lista de cards verticais (Título / Autor / botões empilhados).
- Formulários ocupam 100% da largura com padding lateral.

---

## Mapa de navegação

```
/                          Lista de posts
/posts/:id                 Leitura de post
/admin                     Lista administrativa
/admin/posts/novo          Criar post
/admin/posts/:id/editar    Editar post
```
