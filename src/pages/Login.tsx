import { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Input } from '../components/Input'
import { MOCK_PASSWORD, MOCK_USER, useAuth } from '../contexts/AuthContext'

// `state.from` é setado pelo PrivateRoute quando ele redireciona pra cá,
// pra voltarmos pra rota original depois do login.
type LocationState = { from?: { pathname: string } }

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const ok = login(username.trim(), password)
    if (!ok) {
      setError('Usuário ou senha inválidos.')
      return
    }

    const state = location.state as LocationState | null
    navigate(state?.from?.pathname ?? '/admin', { replace: true })
  }

  return (
    <Container>
      <Title>Entrar</Title>

      <Card>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Usuário"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit">Entrar</Button>

          <Hint>
            Credenciais de demonstração: <code>{MOCK_USER}</code> /{' '}
            <code>{MOCK_PASSWORD}</code>
          </Hint>
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

const Hint = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;

  code {
    background: ${({ theme }) => theme.colors.surfaceHover};
    padding: 0.1rem 0.35rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  }
`
