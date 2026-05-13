import styled from 'styled-components'

// Caixa com fundo levemente destacado e borda — usada para cards de post,
// formulários e blocos de conteúdo agrupado.
export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`
