import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'
import { getPost, updatePost } from '../services/posts'
import type { Post } from '../types/post'

export function PostEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setLoadError(null)
    getPost(id)
      .then(setPost)
      .catch((err: Error) => setLoadError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!id) return

    const formData = new FormData(event.currentTarget)
    const payload = {
      titulo: String(formData.get('titulo') ?? '').trim(),
      conteudo: String(formData.get('conteudo') ?? '').trim(),
      autor: String(formData.get('autor') ?? '').trim(),
    }

    setSubmitting(true)
    setSubmitError(null)
    try {
      await updatePost(id, payload)
      navigate('/admin')
    } catch (err) {
      setSubmitError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <Status>Carregando post...</Status>
      </Container>
    )
  }

  if (loadError || !post) {
    return (
      <Container>
        <StatusError>Erro ao carregar: {loadError ?? 'post não encontrado'}</StatusError>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Editar post</Title>

      <Card>
        {/* defaultValue funciona como pré-preenchimento em form não controlado;
            a key={post.id} garante remount se o id mudar. */}
        <Form onSubmit={handleSubmit} key={post.id}>
          <Input
            label="Título"
            name="titulo"
            defaultValue={post.titulo}
            required
          />
          <Input
            label="Autor"
            name="autor"
            defaultValue={post.autor}
            required
          />
          <Textarea
            label="Conteúdo"
            name="conteudo"
            defaultValue={post.conteudo}
            required
          />

          {submitError && <ErrorMessage>Erro: {submitError}</ErrorMessage>}

          <Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/admin')}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </Actions>
        </Form>
      </Card>
    </Container>
  )
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const StatusError = styled(Status)`
  color: ${({ theme }) => theme.colors.danger};
`
