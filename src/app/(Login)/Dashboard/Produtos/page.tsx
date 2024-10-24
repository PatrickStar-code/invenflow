'use client'
import GenericTable from '@/app/components/genericTable'
import React, { useState } from 'react'
import { ColumnsProps } from '../page'
import { useCrud } from '@/app/hooks/useCrud'

// Definindo o tipo de produto
export interface Product {
  id: number
  name: string
  stock: number
  costPrice: number
  salePrice: number
  supplier: string
  category: string
}

// Produtos de exemplo
const products: Product[] = [
  {
    id: 1,
    name: 'Produto A',
    stock: 10,
    costPrice: 15.0,
    salePrice: 25.0,
    supplier: 'Fornecedor X',
    category: 'Categoria 1',
  },
  // Adicione mais produtos conforme necessário
]

// Definindo as colunas com o tipo correto
const columns: ColumnsProps<Product>[] = [
  { header: 'Nome', key: 'name', type: 'string' },
  {
    header: 'Estoque',
    key: 'stock',
    type: 'number',
  },
  {
    header: 'Preço de Custo',
    key: 'costPrice',
    type: 'number',
    formatToLocale: true,
  },
  {
    header: 'Preço de Venda',
    key: 'salePrice',
    type: 'number',
    formatToLocale: true,
  },
  {
    header: 'Fornecedor',
    key: 'supplier',
    type: 'string',
  },
  {
    header: 'Categoria',
    key: 'category',
    type: 'string',
  },
]

export default function ProdutosPage() {
  const [nameTable, setNameTable] = useState('Produtos')

  const changeTableName = (name: string) => {
    setNameTable(name)
  }
  useCrud()

  return (
    <main className="flex-1 bg-white">
      <GenericTable<Product>
        title={nameTable}
        data={products}
        columns={columns}
        changeTableName={changeTableName}
      />
    </main>
  )
}
