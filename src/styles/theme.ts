export const theme = {
  colors: {
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: '#334155',
    danger: '#ef4444',
    success: '#22c55e',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
} as const

export type Theme = typeof theme
