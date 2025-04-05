import { ref, computed, type ShallowRef, type ShallowUnwrapRef } from "vue";
import { useFetch, useOverlay, useToast } from "#imports";
import type { Table } from "@tanstack/vue-table";

export const useTable = <T>(sortingValue: string) => {
	const table: Readonly<
		ShallowRef<ShallowUnwrapRef<{
			tableApi: Table<T>;
		}> | null>
	> = useTemplateRef("table");
	const rowSelection = ref({});
	const sorting = ref([
		{
			id: sortingValue,
			desc: false,
		},
	]);
	// const totalItems = ref(0)

	// // Filtering state

	// // Table state
	// const table = ref()
	// const rowSelection = ref({})
	// const columnVisibility = ref({
	//   id: false,
	//   correo: false,
	// })
	// const sorting = ref([{ id: 'nombre', desc: false }])
	return { table, rowSelection, sorting };
	// // Data fetching
	// const { data, status, error, refresh } = useFetch<{
	//   count: number
	//   totalPages: number
	//   data: Usuario[]
	// }>('personal/usuarios', {
	//   query: computed(() => ({
	//     page: page.value,
	//     pageSize: pageSize.value,
	//     // ... otros parámetros
	//   })),
	//   baseURL: useRuntimeConfig().public.apiUrl,
	// })

	// // Methods
	// const openInsertModal = async () => {
	//   const modal = overlay.create(LazyPersonalUsuarioInsertModal, {
	//     props: { open: false, user: undefined },
	//   })
	//   await modal.open()
	// }

	// const handlePageSizeChange = (size: string) => {
	//   page.value = '1'
	//   pageSize.value = size
	// }

	// const handleGoToPage = (newPage: number) => {
	//   page.value = `${newPage}`
	// }

	// const getRowItems = (row: Row<Usuario>) => [
	//   // ... items del menú
	// ]

	// const colmnHeader = (column: Column<Usuario>, headerName: string) => {
	//   // ... implementación
	// }

	// // Watchers
	// watch(data, (newData) => {
	//   totalItems.value = newData?.count || 0
	// })
};
