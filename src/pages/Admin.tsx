import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { deletePost, listPosts } from '../services/posts'
import type { Post } from '../types/post'

export function Admin() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function refresh() {
    setLoading(true)
    setError(null)
    listPosts()
      .then(setPosts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleDelete(post: Post) {
    // confirm() é a forma mais simples — substituir por um modal próprio depois.
    const ok = window.confirm(`Excluir o post "${post.titulo}"?`)
    if (!ok) return

    try {
      await deletePost(post.idpost)
      // Remove localmente pra não precisar recarregar a lista inteira.
      setPosts((current) => current.filter((p) => p.idpost !== post.idpost))
    } catch (err) {
      alert(`Falha ao excluir: ${(err as Error).message}`)
    }
  }

  return (
    <Container>
      <Header>
        <Title>Administrar posts</Title>
        <Button onClick={() => navigate('/admin/posts/novo')}>
          + Novo post
        </Button>
      </Header>

      {loading && <Status>Carregando posts...</Status>}
      {error && <StatusError>Erro: {error}</StatusError>}
      {!loading && !error && posts.length === 0 && (
        <Status>Nenhum post cadastrado.</Status>
      )}

      <List>
        {posts.map((post) => (
          <Row key={post.idpost}>
            <RowInfo>
              <RowTitle>{post.titulo}</RowTitle>
              <RowMeta>por {post.autor}</RowMeta>
            </RowInfo>
            <RowActions>
              <Button
                variant="secondary"
                onClick={() => navigate(`/admin/posts/${post.idpost}/editar`)}
              >
                Editar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(post)}>
                Excluir
              </Button>
            </RowActions>
          </Row>
        ))}
      </List>
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const Row = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const RowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const RowTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
`

const RowMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const RowActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const StatusError = styled(Status)`
  color: ${({ theme }) => theme.colors.danger};
`
