import { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'

export function PostEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    alert(`Salvar alterações do post #${id} (placeholder)`)
    navigate('/admin')
  }

  return (
    <Container>
      <Title>Editar post #{id}</Title>

      <Card>
        <Form onSubmit={handleSubmit}>
          {/* defaultValue simula dados pré-carregados — vai virar GET /posts/:id depois */}
          <Input
            label="Título"
            name="titulo"
            defaultValue="Título atual do post"
            required
          />
          <Input
            label="Autor"
            name="autor"
            defaultValue="Prof. Fulano"
            required
          />
          <Textarea
            label="Conteúdo"
            name="conteudo"
            defaultValue="Texto atual do post..."
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
            <Button type="submit">Salvar alterações</Button>
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
