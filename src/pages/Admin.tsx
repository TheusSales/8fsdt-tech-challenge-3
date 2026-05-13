import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'

const FAKE_POSTS = [
  { id: 1, titulo: 'Introdução ao React', autor: 'Prof. Fulano' },
  { id: 2, titulo: 'Hooks essenciais', autor: 'Prof. Beltrana' },
  { id: 3, titulo: 'Styled Components na prática', autor: 'Prof. Fulano' },
]

export function Admin() {
  // useNavigate dá uma função pra navegar de dentro de handlers de eventos.
  const navigate = useNavigate()

  return (
    <Container>
      <Header>
        <Title>Administrar posts</Title>
        <Button onClick={() => navigate('/admin/posts/novo')}>
          + Novo post
        </Button>
      </Header>

      <List>
        {FAKE_POSTS.map((post) => (
          <Row key={post.id}>
            <RowInfo>
              <RowTitle>{post.titulo}</RowTitle>
              <RowMeta>por {post.autor}</RowMeta>
            </RowInfo>
            <RowActions>
              <Button
                variant="secondary"
                onClick={() => navigate(`/admin/posts/${post.id}/editar`)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={() => alert(`Excluir post #${post.id} (placeholder)`)}
              >
                Excluir
              </Button>
            </RowActions>
          </Row>
        ))}
      </List>

      <Hint>
        Esta é uma listagem placeholder.{' '}
        <Link to="/">Voltar para a lista pública</Link>.
      </Hint>
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

const Hint = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`
