import { cn } from '@/lib/utils'
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IconUpload } from '@tabler/icons-react'
import { useDropzone } from 'react-dropzone'

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
}

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

export const FileUpload = ({
  onChange,
  onImport,
}: {
  onChange?: (files: File[]) => void
  onImport?: (file: File) => Promise<void>
}) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles)
    if (onChange) {
      onChange(newFiles)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error)
    },
  })

  return (
    <div className="flex justify-end items-center">
      <div className="w-full max-w-md">
        <div className="w-full" {...getRootProps()}>
          <motion.div
            onClick={handleClick}
            whileHover="animate"
            className={`p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden`}
          >
            <input
              ref={fileInputRef}
              id="file-upload-handle"
              type="file"
              onChange={(e) =>
                handleFileChange(Array.from(e.target.files || []))
              }
              className={`hidden`}
              accept=".xls,.xlsx"
            />

            <div className="flex flex-col items-center justify-center">
              <div
                className={`relative mt-10 max-w-xl mx-auto ${files.length > 0 ? 'w-full' : 'w-40'}`}
              >
                {files.length > 0 &&
                  files.map((file, idx) => (
                    <motion.div
                      key={'file' + idx}
                      layoutId={
                        idx === 0 ? 'file-upload' : 'file-upload-' + idx
                      }
                      className={cn(
                        'relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md',
                        'shadow-sm',
                      )}
                    >
                      <div className="flex justify-between w-full items-center gap-4">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                        >
                          {file.name}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                        >
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </motion.p>
                      </div>

                      <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                        >
                          modified{' '}
                          {new Date(file.lastModified).toLocaleDateString()}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                {!files.length && (
                  <motion.div
                    layoutId="file-upload"
                    variants={mainVariant}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={cn(
                      'relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                      'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]',
                    )}
                  >
                    {isDragActive ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-neutral-600 flex flex-col items-center"
                      >
                        Drop it
                        <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                      </motion.p>
                    ) : (
                      <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                    )}
                  </motion.div>
                )}

                {!files.length && (
                  <motion.div
                    variants={secondaryVariant}
                    className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                  ></motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        {/* Botão de salvar */}
        <div className="flex justify-center mt-4 ">
          <button
            onClick={() => {
              // Verifica se há arquivos e se onImport é uma função
              if (files.length > 0 && onImport) {
                try {
                  onImport(files[0]) // Aguarda a execução da função onImport
                } catch (error) {
                  console.error('Erro ao importar o arquivo:', error)
                }
              } else {
                console.warn(
                  'Nenhum arquivo para importar ou onImport não foi definido',
                )
              }
            }}
            disabled={files.length === 0}
            className={`${files.length > 0 ? 'opacity-100' : 'opacity-50'} px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200`}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
