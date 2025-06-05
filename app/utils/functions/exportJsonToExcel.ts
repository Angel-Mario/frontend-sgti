import { saveAs } from 'file-saver'
import { utils, write } from 'xlsx'

interface ExcelExportOptions {
  filename: string
  sheetName?: string
}

export function exportJsonToExcel(
  data: Record<string, any>, // Objeto JSON (no array)
  options: ExcelExportOptions,
): void {
  // Convertir el objeto en array de pares [clave, valor]
  const dataArray = Object.entries(data).map(([key, value]) => ({
    Propiedad: key,
    Valor: value,
  }))

  // Crear hoja de trabajo
  const worksheet = utils.json_to_sheet(dataArray)

  // Ajustar anchos de columna
  const colWidths = [
    { wch: 20 }, // Columna "Propiedad"
    { wch: 50 }, // Columna "Valor"
  ]
  worksheet['!cols'] = colWidths

  // Crear libro de trabajo
  const workbook = utils.book_new()
  utils.book_append_sheet(
    workbook,
    worksheet,
    options.sheetName || 'Datos',
  )

  // Generar buffer Excel
  const excelBuffer = write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  // Crear y guardar archivo
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `${options.filename}.xlsx`)
}
