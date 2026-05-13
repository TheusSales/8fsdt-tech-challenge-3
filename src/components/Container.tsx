import styled from 'styled-components'

// Centraliza o conteúdo e limita a largura máxima da página.
export const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`
