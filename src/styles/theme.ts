// Tokens do design system — alterar aqui propaga pra todos os componentes
// estilizados que usam `${({ theme }) => theme.xxx}`.
export const theme = {
  colors: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#273449',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
    danger: '#ef4444',
    dangerHover: '#dc2626',
    success: '#22c55e',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    title: '2.5rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  // Breakpoints para media queries. Uso: `@media (min-width: ${theme.breakpoints.tablet})`.
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
    md: '0 4px 12px rgba(0, 0, 0, 0.25)',
  },
} as const

export type Theme = typeof theme
