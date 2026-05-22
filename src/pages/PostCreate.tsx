import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'
import { createPost } from '../services/posts'

export function PostCreate() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // FormData lê os valores direto do <form>; os `name` dos inputs viram chaves.
    const formData = new FormData(event.currentTarget)
    const payload = {
      titulo: String(formData.get('titulo') ?? '').trim(),
      conteudo: String(formData.get('conteudo') ?? '').trim(),
      autor: String(formData.get('autor') ?? '').trim(),
    }

    setSubmitting(true)
    setError(null)
    try {
      await createPost(payload)
      navigate('/admin')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <Title>Novo post</Title>

      <Card>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Título"
            name="titulo"
            placeholder="Título do post"
            required
            minLength={3}
            maxLength={255}
          />
          <Input
            label="Autor"
            name="autor"
            placeholder="Seu nome"
            required
            minLength={2}
            maxLength={255}
          />
          <Textarea
            label="Conteúdo"
            name="conteudo"
            placeholder="Escreva o conteúdo do post..."
            required
            maxLength={10000}
          />

          {error && <ErrorMessage>Erro: {error}</ErrorMessage>}

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
              {submitting ? 'Publicando...' : 'Publicar'}
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
