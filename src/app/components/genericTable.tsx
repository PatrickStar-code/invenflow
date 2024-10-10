'use client'
import {
  IconFileImport,
  IconPlus,
  IconTrash,
  IconEdit,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'

// Definindo uma interface genérica com a propriedade 'id'
interface Identifiable {
  id: number
}

// Definindo as props do componente
interface TableColumn<T> {
  title: string
  dataIndex: keyof T
}

interface GenericTableProps<T extends Identifiable> {
  data: T[]
  columns: TableColumn<T>[]
  onAdd: () => void // Função para adicionar item
  onDelete: (id: number) => void // Função para deletar item
  onImport: () => void // Função para importar dados
  onEdit: (id: number) => void // Função para editar item
  onExport: () => void // Função para exportar dados
}

export default function GenericTable<T extends Identifiable>({
  data,
  columns,
  onAdd,
  onDelete,
  onImport,
  onEdit,
  onExport,
}: GenericTableProps<T>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* Botões de Ação */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={onImport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          <IconFileImport className="w-5 h-5 mr-2" /> Importar
        </button>
        <button
          onClick={onAdd}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          <IconPlus className="w-5 h-5 mr-2" /> Adicionar
        </button>
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200"
        >
          <IconFileImport className="w-5 h-5 mr-2" /> Exportar
        </button>
      </div>
      <div className="overflow-x-auto w-full max-w-6xl">
        <motion.table
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-full bg-white rounded-lg shadow-lg"
        >
          <thead className="bg-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.title}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {col.title}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {data.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-100"
              >
                {columns.map((col) => (
                  <td
                    key={col.dataIndex as string}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                  >
                    {/* Convertendo valores para ReactNode */}
                    {String(item[col.dataIndex])}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <button
                    onClick={() => onEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <IconEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <IconTrash className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  )
}
