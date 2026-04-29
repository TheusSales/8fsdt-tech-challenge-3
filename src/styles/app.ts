import styled from 'styled-components'

export const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(2rem, 5vw, 3rem);
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 32rem;
`
