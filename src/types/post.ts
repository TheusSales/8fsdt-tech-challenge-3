// Modelo de post. Os campos seguem os nomes em português do back-end
// (titulo, conteudo, autor) pra evitar mapeamento extra nas requisições.
export type Post = {
  id: number
  titulo: string
  conteudo: string
  autor: string
}

// Payload usado em POST /posts e PUT /posts/:id.
export type PostInput = {
  titulo: string
  conteudo: string
  autor: string
}
