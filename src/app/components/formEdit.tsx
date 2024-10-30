import React from 'react'
import { ColumnsProps } from '../(Login)/Dashboard/page'

interface FormEditProps<T> {
  columns: ColumnsProps<T>[]
  item?: T
  editData?: (data: T, id: number) => void
}

export default function FormEdit<T extends { id: number }>({
  columns = [],
  item,
  editData,
}: FormEditProps<T>) {
  const ActionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    // Converte FormData para um objeto simples
    const data: Partial<T> = Object.fromEntries(
      formData.entries(),
    ) as Partial<T>

    console.table(data)

    if (editData) {
      editData(data as T, item?.id as number)
    }
  }
  return (
    <form onSubmit={(e) => ActionSubmit(e)}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        {columns.map((col) => {
          const value = item?.[col.key as keyof T]

          return (
            <div key={col.key as string}>
              <label
                className="text-black dark:text-gray-200"
                htmlFor={col.key as string}
              >
                {col.header}
              </label>
              <input
                id={col.key as string}
                defaultValue={
                  typeof value === 'string' ||
                  typeof value === 'number' ||
                  Array.isArray(value)
                    ? value
                    : undefined
                }
                type={col.type}
                name={col.key as string}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          )
        })}
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
