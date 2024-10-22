'use client'
import GenericTable from '@/app/components/genericTable'
import React, { useState } from 'react'
import { ColumnsProps } from '../page'
// import * as XLSX from 'xlsx'

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
  { title: 'Nome', dataIndex: 'name', type: 'string' },
  {
    title: 'Estoque',
    dataIndex: 'stock',
    type: 'number',
  },
  {
    title: 'Preço de Custo',
    dataIndex: 'costPrice',
    type: 'number',
    formatToLocale: true,
  },
  {
    title: 'Preço de Venda',
    dataIndex: 'salePrice',
    type: 'number',
    formatToLocale: true,
  },
  {
    title: 'Fornecedor',
    dataIndex: 'supplier',
    type: 'string',
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    type: 'string',
  },
]

export default function ProdutosPage() {
  const [nameTable, setNameTable] = useState('Produtos')

  const changeTableName = (name: string) => {
    setNameTable(name)
  }

  const handleAdd = () => {
    console.log('Adicionar produto')
  }

  const handleDelete = (id: number) => {
    console.log(`Deletar produto com id: ${id}`)
  }

  const handleEdit = (id: number) => {
    console.log(`Editar produto com id: ${id}`)
  }

  const handleImport = () => {
    console.log('Importar produtos')
  }

  const handleExport = () => {
    console.log('Exportar produtos')
  }

  return (
    <main className="flex-1 bg-white">
      <GenericTable
        title={nameTable}
        data={products}
        columns={columns}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onImport={handleImport}
        onEdit={handleEdit}
        onExport={handleExport}
        changeTableName={changeTableName}
      />
    </main>
  )
}
