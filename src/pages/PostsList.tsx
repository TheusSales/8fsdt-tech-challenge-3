import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { useDebounce } from '../hooks/useDebounce'
import { listPosts, searchPosts } from '../services/posts'
import type { Post } from '../types/post'

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Termo digitado pelo usuário; o debounced só atualiza depois de 300ms
  // sem novas teclas, evitando chamadas a cada caractere.
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const promise = debouncedSearch.trim()
      ? searchPosts(debouncedSearch.trim())
      : listPosts()

    promise
      .then(setPosts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [debouncedSearch])

  return (
    <Container>
      <Header>
        <Title>Posts recentes</Title>
        <Input
          label="Buscar"
          placeholder="buscar por palavra-chave..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Header>

      {loading && <Status>Carregando posts...</Status>}
      {error && <StatusError>Erro: {error}</StatusError>}
      {!loading && !error && posts.length === 0 && (
        <Status>Nenhum post encontrado.</Status>
      )}

      <List>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostLink to={`/posts/${post.id}`}>
              <PostTitle>{post.titulo}</PostTitle>
              <PostMeta>por {post.autor}</PostMeta>
              <PostExcerpt>{excerpt(post.conteudo)}</PostExcerpt>
              <ReadMore>Ler &gt;</ReadMore>
            </PostLink>
          </PostCard>
        ))}
      </List>
    </Container>
  )
}

// Corta o conteúdo em ~150 caracteres pra mostrar como descrição no card.
function excerpt(text: string, max = 150) {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '...'
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
`

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const StatusError = styled(Status)`
  color: ${({ theme }) => theme.colors.danger};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const PostCard = styled(Card)`
  padding: 0;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const PostLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.lg};
  color: inherit;
  text-decoration: none;
`

const PostTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const PostMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ReadMore = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`
