import React from 'react'
import { ColumnsProps } from '../(Login)/Dashboard/page'

interface FormAddProps<T> {
  columns: ColumnsProps<T>[]
  addData?: (data: T) => void
}

export default function FormAdd<T>({ columns = [], addData }: FormAddProps<T>) {
  const ActionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // Converte FormData para um objeto simples
    const data: Partial<T> = Object.fromEntries(
      formData.entries(),
    ) as Partial<T>

    if (addData) {
      addData(data as T)
    }
  }

  return (
    <form onSubmit={ActionSubmit}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        {columns.map((col, index) => (
          <div key={`${col.key as string}-${index}`}>
            <label
              className="text-black dark:text-gray-200"
              htmlFor={col.key as string}
            >
              {col.header}
            </label>
            <input
              id={col.key as string}
              name={col.key as string} // Adicione o atributo name
              required
              placeholder={col.header}
              type={col.type}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
