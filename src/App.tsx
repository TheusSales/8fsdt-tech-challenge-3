import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Admin } from './pages/Admin'
import { NotFound } from './pages/NotFound'
import { PostCreate } from './pages/PostCreate'
import { PostDetail } from './pages/PostDetail'
import { PostEdit } from './pages/PostEdit'
import { PostsList } from './pages/PostsList'

// Mapa de rotas da aplicação. O Header fica fora das <Routes> pra aparecer
// em todas as páginas.
export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/posts/novo" element={<PostCreate />} />
        <Route path="/admin/posts/:id/editar" element={<PostEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
