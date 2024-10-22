'use client'
import {
  IconFileImport,
  IconPlus,
  IconTrash,
  IconEdit,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { Modal, ModalTrigger } from './ui/animated-modal'
import ModalPreset from './modal'
import { UseFormater } from '../hooks/useFormater'
import { ColumnsProps } from '../(Login)/Dashboard/page'

// Interface genérica com a propriedade 'id'
interface GenericTableProps<T> {
  data: T[] // Dados genéricos
  columns: ColumnsProps<T>[] // Colunas genéricas com base em T
  title: string
  onAdd: () => void // Função para adicionar item
  onDelete: (id: number) => void // Função para deletar item
  onImport: () => void // Função para importar dados
  onEdit: (id: number) => void // Função para editar item
  onExport: () => void // Função para exportar dados
  changeTableName: (name: string) => void
}

export default function GenericTable<T extends { id: number }>({
  data,
  columns,
  ...props
}: GenericTableProps<T>) {
  // Função para formatar os valores dentro do próprio componente
  const formatValue = (value: unknown, col: ColumnsProps<T>) => {
    if (col.formatToLocale && typeof value === 'number') {
      return UseFormater(value) // Chama o hook useFormater
    }
    return String(value)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* Título e Botões de Ação */}
      <div className="mb-4 flex items-center justify-between w-full max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">{props.title}</h1>
        </div>

        <div className="flex gap-4">
          <Modal>
            <ModalTrigger className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
              <IconFileImport className="w-5 h-5 mr-2" /> Importar
            </ModalTrigger>
            <ModalPreset
              mainText="Importe Aqui Seu Arquivo Excel"
              isImport={true}
              columns={columns}
            />
          </Modal>
          <Modal>
            <ModalTrigger className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
              <IconPlus className="w-5 h-5 mr-2" /> Adicionar
            </ModalTrigger>
            <ModalPreset
              mainText="Adicione Aqui Seu Registro"
              isAdd={true}
              columns={columns}
            />
          </Modal>
          <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200">
            <IconFileImport className="w-5 h-5 mr-2" /> Exportar
          </button>
        </div>
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
                    {formatValue(item[col.dataIndex], col)}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex">
                  <Modal>
                    <ModalTrigger className="text-blue-600 hover:text-blue-800">
                      <IconEdit className="w-5 h-5" />
                    </ModalTrigger>
                    <ModalPreset
                      mainText="Edite Aqui Seu Registro"
                      isEdit={true}
                      columns={columns}
                      item={item}
                    />
                  </Modal>
                  <Modal>
                    <ModalTrigger className="text-red-600 hover:text-red-800">
                      <IconTrash className="w-5 h-5" />
                    </ModalTrigger>
                    <ModalPreset
                      isDelete={true}
                      columns={columns}
                      item={item}
                    />
                  </Modal>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  )
}
