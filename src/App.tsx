import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { PrivateRoute } from './components/PrivateRoute'
import { Admin } from './pages/Admin'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { PostCreate } from './pages/PostCreate'
import { PostDetail } from './pages/PostDetail'
import { PostEdit } from './pages/PostEdit'
import { PostsList } from './pages/PostsList'

// Mapa de rotas da aplicação. O Header fica fora das <Routes> pra aparecer
// em todas as páginas. Rotas /admin/* exigem login (PrivateRoute).
export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/posts/novo"
          element={
            <PrivateRoute>
              <PostCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/posts/:id/editar"
          element={
            <PrivateRoute>
              <PostEdit />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
