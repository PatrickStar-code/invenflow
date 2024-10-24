import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseButton, ModalBody, ModalContent } from './ui/animated-modal'
import { FileUpload } from './ui/file-upload'
import FormAdd from './formAdd'
import { ColumnsProps } from '../(Login)/Dashboard/page'
import FormEdit from './formEdit'

type ModalContextType<T> = {
  mainText?: string
  isImport?: boolean
  isAdd?: boolean
  isDelete?: boolean
  isEdit?: boolean
  columns: ColumnsProps<T>[]
  item?: T
  onImport?: (file: File) => Promise<void>
}

export default function ModalPreset<T>(props: ModalContextType<T>) {
  const [isClient, setIsClient] = useState(false)
  const [modalRoot, setModalRoot] = useState<Element | null>(null)

  useEffect(() => {
    setIsClient(true)
    setModalRoot(document.getElementById('modal-root')) // Define o modalRoot
  }, [])

  if (!isClient || !modalRoot) return null // Garante que o componente só renderize no cliente

  return createPortal(
    <ModalBody>
      <ModalContent>
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
          {props.mainText}
        </h4>
        <div className="flex justify-center items-center"></div>
        <div className="flex flex-wrap gap-x-4 gap-y-6 items-start justify-start ">
          {props.isImport && (
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <div className="md:flex">
                <div className="w-full p-3">
                  <FileUpload onImport={props.onImport} />
                </div>
              </div>
            </div>
          )}

          {props.isAdd && (
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <FormAdd columns={props.columns} />
            </div>
          )}

          {props.isDelete && (
            <div className="max-w-sm mx-auto h-96 mt-4">
              {' '}
              <div className="text-center p-8 flex-auto justify-center">
                {' '}
                {/* Aumenta o preenchimento */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-red-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-xl font-bold py-4">Tem Certeza?</h2>
                <p className="text-md text-gray-500 px-8">
                  Realmente Deseja Excluir o Registro?
                </p>
              </div>
              <div className="p-3 mt-2 text-center space-x-4 md:block">
                <CloseButton className=" mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                  Cancel
                </CloseButton>
                <CloseButton className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                  Delete
                </CloseButton>
              </div>
            </div>
          )}
          {props.isEdit && (
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <FormEdit columns={props.columns} item={props.item} />
            </div>
          )}
        </div>
      </ModalContent>
    </ModalBody>,
    modalRoot,
  )
}
