import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../components/Container'

export function PostDetail() {
  // useParams lê os valores definidos na rota (ex: ":id" em /posts/:id).
  const { id } = useParams<{ id: string }>()

  return (
    <Container>
      <BackLink to="/">&lt; Voltar</BackLink>

      <Title>Post #{id} — título do post</Title>
      <Meta>por Prof. Fulano</Meta>

      <Content>
        <p>
          Conteúdo completo do post. Esta é uma página placeholder — quando
          conectarmos com a API, esse texto vem do endpoint{' '}
          <code>GET /posts/:id</code>.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Content>
    </Container>
  )
}

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  line-height: 1.7;

  code {
    background: ${({ theme }) => theme.colors.surface};
    padding: 0 ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`
