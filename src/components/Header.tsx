import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'

// Header global. Links viram NavLink-like via `useLocation` pra marcar
// qual rota está ativa. Em mobile o conteúdo empilha verticalmente.
export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const isAdmin = pathname.startsWith('/admin')
  const isLogin = pathname === '/login'

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <Bar>
      <Inner>
        <Brand to="/">TECH BLOG</Brand>
        <Nav>
          <NavItem to="/" $active={!isAdmin && !isLogin}>
            Posts
          </NavItem>
          {isAuthenticated && (
            <NavItem to="/admin" $active={isAdmin}>
              Admin
            </NavItem>
          )}
          {isAuthenticated ? (
            <>
              <UserBadge>Olá, {user?.username}</UserBadge>
              <NavButton onClick={handleLogout}>Sair</NavButton>
            </>
          ) : (
            <NavItem to="/login" $active={isLogin}>
              Entrar
            </NavItem>
          )}
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
  padding: ${({ theme }) => `${theme.spacing.md}`};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const Brand = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.05em;
  text-decoration: none;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-end;
  }
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

const NavButton = styled.button`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const UserBadge = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`
