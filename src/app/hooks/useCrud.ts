import { ColumnsProps } from '../(Login)/Dashboard/page'
import { Workbook } from 'exceljs'

export function useCrud<T>() {
  const handleAdd = () => {
    console.log('Adicionar produto')
  }

  const handleDelete = (id: number) => {
    console.log(`Deletar produto com id: ${id}`)
  }

  const handleEdit = (id: number) => {
    console.log(`Editar produto com id: ${id}`)
  }

  const handleImport = async (file: File, columns?: ColumnsProps<T>[]) => {
    try {
      console.log(file) // Verifica se o arquivo é recebido corretamente
      if (!columns || columns.length === 0) {
        throw new Error('As colunas não foram definidas ou estão vazias.')
      }

      const fileReader = new FileReader()

      // Adiciona o evento onload antes de ler o arquivo
      fileReader.onload = async (event) => {
        // Verifica se o resultado é válido
        const result = event.target?.result
        if (!result) {
          console.error('Erro: O resultado do FileReader é nulo ou indefinido.')
          return
        }

        const data = new Uint8Array(result as ArrayBuffer)
        const workbook = new Workbook()
        await workbook.xlsx.load(data) // Carrega o arquivo Excel

        const sheet = workbook.getWorksheet(1)
        if (!sheet) {
          console.error('Erro: A planilha não foi encontrada.')
          return
        }

        // Verifica se a primeira linha contém valores
        const firstRow = sheet.getRow(1)
        if (!firstRow) {
          console.error('Erro: A primeira linha não foi encontrada.')
          return
        }

        // Verifica se values existe e é um array
        if (!firstRow.values || !Array.isArray(firstRow.values)) {
          console.error('Erro: A primeira linha não contém valores válidos.')
          return
        }

        const headers = firstRow.values.slice(1)
        const columnKeys = columns.map((col) => col.header)

        const missingHeaders = columnKeys.filter(
          (key) => !headers.includes(key),
        )
        if (missingHeaders.length > 0) {
          throw new Error(
            `As seguintes colunas estão faltando: ${missingHeaders.join(', ')}`,
          )
        }

        const resultArray: Partial<T>[] = []

        sheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            const tableRow: Partial<T> = {}

            columns.forEach((col, index) => {
              const cellValue = row.getCell(index + 1).value
              if (cellValue !== undefined) {
                tableRow[col.key as keyof T] = cellValue as T[keyof T]
              } else {
                console.warn(
                  `Valor indefinido na coluna "${col.header}" na linha ${rowNumber}`,
                )
              }
            })

            resultArray.push(tableRow as T)
          }
        })

        console.table(resultArray)
        // Aqui você pode fazer o que precisa com os resultados, como salvar no banco de dados
      }

      // Adiciona o evento onerror para capturar erros de leitura
      fileReader.onerror = (error) => {
        console.error('Erro ao ler o arquivo:', error)
      }

      // Inicia a leitura do arquivo como um ArrayBuffer
      fileReader.readAsArrayBuffer(file)
    } catch (error) {
      console.error('Erro ao importar o arquivo Excel:', error)
    }
  }

  const handleExport = () => {
    console.log('Exportar produtos')
  }

  return {
    handleAdd,
    handleDelete,
    handleEdit,
    handleImport,
    handleExport,
  }
}
