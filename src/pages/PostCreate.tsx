import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'

export function PostCreate() {
  const navigate = useNavigate()

  // Handler placeholder — quando integrarmos com a API, troca o alert por
  // uma chamada POST /posts.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    alert('Publicar post (placeholder)')
    navigate('/admin')
  }

  return (
    <Container>
      <Title>Novo post</Title>

      <Card>
        <Form onSubmit={handleSubmit}>
          <Input label="Título" name="titulo" placeholder="Título do post" required />
          <Input label="Autor" name="autor" placeholder="Seu nome" required />
          <Textarea
            label="Conteúdo"
            name="conteudo"
            placeholder="Escreva o conteúdo do post..."
            required
          />

          <Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/admin')}
            >
              Cancelar
            </Button>
            <Button type="submit">Publicar</Button>
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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`
