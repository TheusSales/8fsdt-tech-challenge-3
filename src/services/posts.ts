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

export function createPost(data: PostInput) {
  return request<Post>('/posts', { method: 'POST', body: data })
}

export function updatePost(id: number | string, data: PostInput) {
  return request<Post>(`/posts/${id}`, { method: 'PUT', body: data })
}

export function deletePost(id: number | string) {
  return request<null>(`/posts/${id}`, { method: 'DELETE' })
}
