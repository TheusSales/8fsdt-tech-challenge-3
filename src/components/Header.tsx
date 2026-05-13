import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

// Header global. Os links viram NavLink-like via `useLocation` pra marcar
// qual rota está ativa, sem precisar usar o NavLink do router.
export function Header() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <Bar>
      <Inner>
        <Brand to="/">TECH BLOG</Brand>
        <Nav>
          <NavItem to="/" $active={!isAdmin}>
            Posts
          </NavItem>
          <NavItem to="/admin" $active={isAdmin}>
            Admin
          </NavItem>
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

const Brand = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.05em;
  text-decoration: none;
`

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const NavItem = styled(Link)<{ $active: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.medium : theme.fontWeights.regular};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
