import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Input({ label, id, ...rest }: InputProps) {
  // useId gera um id único pra associar o <label> ao <input>
  // (acessibilidade — leitores de tela conseguem ler o rótulo do campo).
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <Field>
      <Label htmlFor={inputId}>{label}</Label>
      <StyledInput id={inputId} {...rest} />
    </Field>
  )
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const StyledInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`
