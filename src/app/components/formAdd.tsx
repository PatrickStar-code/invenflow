import React from 'react'
import { ColumnsProps } from '../(Login)/Dashboard/page'

interface FormAddProps<T> {
  columns: ColumnsProps<T>[]
}

export default function FormAdd<T>({ columns = [] }: FormAddProps<T>) {
  console.log(columns)

  return (
    <form>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        {columns.map((col) => (
          <div key={col.dataIndex as string}>
            <label
              className="text-black dark:text-gray-200"
              htmlFor={col.dataIndex as string}
            >
              {col.title}
            </label>
            <input
              id={col.dataIndex as string}
              type={col.type}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600">
          Save
        </button>
      </div>
    </form>
  )
}
