import { ref, type ShallowRef, type ShallowUnwrapRef } from "vue";
import type { Table } from "@tanstack/vue-table";

export const useTable = <T>() => {
	const table: Readonly<
		ShallowRef<ShallowUnwrapRef<{
			tableApi: Table<T>;
		}> | null>
	> = useTemplateRef("table");
	const rowSelection = ref({});

	return { table, rowSelection };
};
