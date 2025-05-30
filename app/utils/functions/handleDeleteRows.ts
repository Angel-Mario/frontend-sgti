import { makeDeleteOptions } from './makeDeleteOptions.ts'

export async function handleDeleteRows<T extends { id: string }>(route: string, refresh: () => void, deleteSelection: () => void, selected: T[] | undefined, token?: string) {
  if (!selected)
    return

  const toast = useToast()

  await $fetch(route, {
    method: 'DELETE',
    ...makeDeleteOptions(
      `Se han eliminado ${
        selected.length > 1 ? 'los registros seleccionados' : 'el registro'
      } correctamente`,
      { ids: selected.map(item => item.id) },
      refresh,
      deleteSelection,
      toast,
      token,
    ),
  })
}
