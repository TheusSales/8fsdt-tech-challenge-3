import type { Post, PostInput } from '../types/post'
import { request } from './api'

// Uma função por endpoint. Quando uma página precisa de dados, ela importa
// só a função correspondente — mantém o componente sem lógica de HTTP.

export function listPosts() {
  return request<Post[]>('/posts')
}

export function getPost(id: number | string) {
  return request<Post>(`/posts/${id}`)
}

export function searchPosts(termo: string) {
  return request<Post[]>(`/posts/search?q=${encodeURIComponent(termo)}`)
}

// POST e PUT vêm envelopados como { message, post } — desempacotamos aqui
// pra que o resto do app receba o Post direto, como nos outros endpoints.
type PostEnvelope = { message: string; post: Post }

export async function createPost(data: PostInput) {
  const res = await request<PostEnvelope>('/posts', { method: 'POST', body: data })
  return res.post
}

export async function updatePost(id: number | string, data: PostInput) {
  const res = await request<PostEnvelope>(`/posts/${id}`, { method: 'PUT', body: data })
  return res.post
}

export function deletePost(id: number | string) {
  return request<null>(`/posts/${id}`, { method: 'DELETE' })
}
