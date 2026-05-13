import styled from 'styled-components'

// Header global da aplicação. Quando entrarmos com React Router, os <a>
// viram <Link>. Por enquanto são links simples só pra estruturar o layout.
export function Header() {
  return (
    <Bar>
      <Inner>
        <Brand href="/">TECH BLOG</Brand>
        <Nav>
          <NavLink href="/">Posts</NavLink>
          <NavLink href="/admin">Admin</NavLink>
        </Nav>
      </Inner>
    </Bar>
  )
}

const Bar = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Inner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

const Brand = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.05em;
`

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
