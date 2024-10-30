import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalBody, ModalContent } from './ui/animated-modal'
import { FileUpload } from './ui/file-upload'
import FormAdd from './formAdd'
import { ColumnsProps } from '../(Login)/Dashboard/page'
import FormEdit from './formEdit'
import FormDelete from './formDelete'

type ModalContextType<T> = {
  mainText?: string
  isImport?: boolean
  isAdd?: boolean
  isDelete?: boolean
  isEdit?: boolean
  columns: ColumnsProps<T>[]
  item?: T
  addData?: (data: T) => void
  onImport?: (file: File) => Promise<void>
  editData?: (data: T, id: number) => void
  deleteData?: (id: number) => void
}

export default function ModalPreset<T extends { id: number }>(
  props: ModalContextType<T>,
) {
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
              <FormAdd columns={props.columns} addData={props.addData} />
            </div>
          )}

          {props.isDelete && (
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <FormDelete deleteData={props.deleteData} id={props.item?.id} />
            </div>
          )}
          {props.isEdit && (
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <FormEdit
                columns={props.columns}
                item={props.item}
                editData={props.editData}
              />
            </div>
          )}
        </div>
      </ModalContent>
    </ModalBody>,
    modalRoot,
  )
}
