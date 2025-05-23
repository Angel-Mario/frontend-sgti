import type { Table } from '@tanstack/vue-table'
import type { ShallowRef, ShallowUnwrapRef } from 'vue'
import { ref } from 'vue'

export function useTable<T>() {
  const table: Readonly<
    ShallowRef<ShallowUnwrapRef<{
      tableApi: Table<T>
    }> | null>
  > = useTemplateRef('table')
  const rowSelection = ref({})

  return { table, rowSelection }
}
