import { type ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Envolve rotas que exigem autenticação. Se o usuário não estiver logado,
// redireciona pra /login passando a rota original em `state.from` pra que
// o Login possa voltar pra lá depois.
export function PrivateRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
