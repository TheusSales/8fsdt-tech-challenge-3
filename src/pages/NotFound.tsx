import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../components/Container'

export function NotFound() {
  return (
    <Container>
      <Wrap>
        <Code>404</Code>
        <Title>Página não encontrada</Title>
        <Description>
          A página que você tentou acessar não existe ou foi removida.
        </Description>
        <BackLink to="/">Voltar para a lista de posts</BackLink>
      </Wrap>
    </Container>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`

const Code = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 28rem;
`

const BackLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`
