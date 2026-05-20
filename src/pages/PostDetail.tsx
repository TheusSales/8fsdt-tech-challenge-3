import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { getPost } from '../services/posts'
import type { Post } from '../types/post'

export function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getPost(id)
      .then(setPost)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <Container>
      <BackLink to="/">&lt; Voltar</BackLink>

      {loading && <Status>Carregando post...</Status>}
      {error && <StatusError>Erro: {error}</StatusError>}

      {post && (
        <>
          <Title>{post.titulo}</Title>
          <Meta>por {post.autor}</Meta>
          <Content>
            {/* O conteúdo é texto simples; renderiza preservando quebras de linha. */}
            {post.conteudo.split('\n').map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </Content>
        </>
      )}
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
`

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const StatusError = styled(Status)`
  color: ${({ theme }) => theme.colors.danger};
`
