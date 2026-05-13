import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Input } from '../components/Input'

// Placeholder com 3 posts fake. A integração com a API entra na próxima etapa.
const FAKE_POSTS = [
  {
    id: 1,
    titulo: 'Introdução ao React',
    autor: 'Prof. Fulano',
    descricao:
      'Conceitos básicos de componentes, props e estado para começar com o pé direito.',
  },
  {
    id: 2,
    titulo: 'Hooks essenciais',
    autor: 'Prof. Beltrana',
    descricao:
      'useState, useEffect e quando usar cada um — guia prático com exemplos.',
  },
  {
    id: 3,
    titulo: 'Styled Components na prática',
    autor: 'Prof. Fulano',
    descricao:
      'Como organizar tema, tokens e componentes reutilizáveis em projetos React.',
  },
]

export function PostsList() {
  return (
    <Container>
      <Header>
        <Title>Posts recentes</Title>
        <Input label="Buscar" placeholder="buscar por palavra-chave..." />
      </Header>

      <List>
        {FAKE_POSTS.map((post) => (
          <PostCard key={post.id}>
            <PostLink to={`/posts/${post.id}`}>
              <PostTitle>{post.titulo}</PostTitle>
              <PostMeta>por {post.autor}</PostMeta>
              <PostExcerpt>{post.descricao}</PostExcerpt>
              <ReadMore>Ler &gt;</ReadMore>
            </PostLink>
          </PostCard>
        ))}
      </List>
    </Container>
  )
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
