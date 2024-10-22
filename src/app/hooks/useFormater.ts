import { useMemo } from 'react'

export function UseFormater(value: number) {
  return useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }, [value])
}
