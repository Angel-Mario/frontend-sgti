import { saveAs } from 'file-saver'
import { utils, write } from 'xlsx'

interface ExcelExportOptions {
  filename: string
  sheetName?: string
}

export function exportToExcel(
  data: any[],
  options: ExcelExportOptions,
): void {
  // Create worksheet from JSON data
  const worksheet = utils.json_to_sheet(data)

  // Create workbook
  const workbook = utils.book_new()
  utils.book_append_sheet(
    workbook,
    worksheet,
    options.sheetName || 'Sheet1',
  )

  // Generate Excel buffer
  const excelBuffer = write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  // Create blob and save
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  saveAs(blob, `${options.filename}.xlsx`)
}
