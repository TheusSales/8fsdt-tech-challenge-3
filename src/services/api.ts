// Base URL da API vem da variável de ambiente VITE_API_URL.
// Se não estiver definida, assume o back-end local (porta 3000).
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

// Wrapper fino sobre fetch que:
// - prefixa a BASE_URL automaticamente
// - envia JSON no body quando passado
// - lança erro se a resposta não for 2xx
// - retorna o JSON já parseado (ou null em 204 No Content)
export async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const { method = 'GET', body } = options

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    // A API devolve erros no formato { "message": "..." }.
    // Tenta extrair essa mensagem; cai pro statusText se o body não for JSON.
    let message = response.statusText
    try {
      const data = await response.json()
      if (data && typeof data.message === 'string') message = data.message
    } catch {
      // body vazio ou não-JSON — mantém statusText
    }
    throw new Error(`Erro ${response.status} ao acessar ${path}: ${message}`)
  }

  // Endpoints como DELETE costumam retornar 204 sem corpo.
  if (response.status === 204) {
    return null as T
  }

  return response.json() as Promise<T>
}
