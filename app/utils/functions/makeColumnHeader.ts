import type { Column } from '@tanstack/vue-table'
import type { ComputedOptions, ConcreteComponent, MethodOptions } from 'vue'

export function makeColumnHeader<T>(column: Column<T>, headerName: string, uButton: string | ConcreteComponent<object, any, any, ComputedOptions, MethodOptions, any>) {
  const isSorted = column.getIsSorted()

  return h(uButton, {
    color: 'neutral',
    ui: { leadingIcon: 'text-(--ui-primary)' },
    variant: 'ghost',
    label: headerName,
    icon: isSorted
      ? isSorted === 'asc'
        ? 'i-lucide-arrow-up-narrow-wide'
        : 'i-lucide-arrow-down-wide-narrow'
      : 'i-lucide-arrow-up-down',
    class: '-mx-2.5',
    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
  })
}
