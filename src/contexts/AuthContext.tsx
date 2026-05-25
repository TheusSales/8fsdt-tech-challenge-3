import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Auth mockada no front: o back-end da Fase 2 não expõe endpoint de login,
// então validamos as credenciais contra um par fixo só pra demonstrar o
// controle de acesso pedido no requisito 6. Em produção isso seria trocado
// por uma chamada real (POST /login -> JWT).
const MOCK_USER = 'professor'
const MOCK_PASSWORD = 'professor123'

const STORAGE_KEY = 'tech-blog:auth'

type AuthUser = { username: string }

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Lê o usuário persistido no localStorage no primeiro render
  // pra manter a sessão após F5.
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  function login(username: string, password: string) {
    if (username === MOCK_USER && password === MOCK_PASSWORD) {
      setUser({ username })
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}

export { MOCK_USER, MOCK_PASSWORD }
