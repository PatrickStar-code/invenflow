'use client'
import GenericTable from '@/app/components/genericTable'
import React from 'react'

interface Product {
  id: number
  name: string
  stock: number
  costPrice: number
  salePrice: number
  supplier: string
  category: string
}

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
  {
    id: 2,
    name: 'Produto B',
    stock: 5,
    costPrice: 30.0,
    salePrice: 45.0,
    supplier: 'Fornecedor Y',
    category: 'Categoria 2',
  },
  // Adicione mais produtos conforme necessário
]

// Definindo as colunas com o tipo correto
const columns: Array<{ title: string; dataIndex: keyof Product }> = [
  { title: 'Nome', dataIndex: 'name' },
  { title: 'Estoque', dataIndex: 'stock' },
  { title: 'Preço de Custo', dataIndex: 'costPrice' },
  { title: 'Preço de Venda', dataIndex: 'salePrice' },
  { title: 'Fornecedor', dataIndex: 'supplier' },
  { title: 'Categoria', dataIndex: 'category' },
]

export default function ProdutosPage() {
  const handleAdd = () => {
    console.log('Adicionar produto')
  }

  const handleDelete = (id: number) => {
    console.log(`Deletar produto com id: ${id}`)
  }

  const handleImport = () => {
    console.log('Importar produtos')
  }

  const handleEdit = (id: number) => {
    console.log(`Editar produto com id: ${id}`)
  }

  const handleExport = () => {
    console.log('Exportar produtos')
  }

  return (
    <main className="flex-1 bg-white">
      <GenericTable
        data={products}
        columns={columns}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onImport={handleImport}
        onEdit={handleEdit}
        onExport={handleExport}
      />
    </main>
  )
}
