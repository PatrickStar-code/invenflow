'use client'
import { motion } from 'framer-motion'

interface TabelaCardProps {
  title: string
  headers: string[]
  data: string[][]
}

export function TabelaCard({ title, headers, data }: TabelaCardProps) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-semibold mb-4 text-lg text-gray-800">{title}</h2>
      <table className="w-full bg-white rounded-lg overflow-hidden border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-3 text-left text-gray-600 border-b border-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="p-3 border-b border-l border-gray-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={headers.length}
              className="p-3 border-b  text-center text-blue-500 hover:bg-gray-100 hover:text-blue-700 cursor-pointer border-gray-300"
            >
              Ver Mais
            </td>
          </tr>
        </tfoot>
      </table>
    </motion.div>
  )
}
