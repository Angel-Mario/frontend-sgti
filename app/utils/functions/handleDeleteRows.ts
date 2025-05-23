import { makeDeleteOptions } from "./makeDeleteOptions.ts";

export const handleDeleteRows = async <T extends { id: string }>(
	route: string,
	refresh: () => void,
	deleteSelection: () => void,
	selected: T[] | undefined,
) => {
	if (!selected) return;

	const toast = useToast();

	await $fetch(route, {
		method: "DELETE",
		...makeDeleteOptions(
			`Se han eliminado ${
				selected.length > 1 ? "los registros seleccionados" : "el registro"
			} correctamente`,
			{ ids: selected.map((item) => item.id) },
			refresh,
			deleteSelection,
			toast,
		),
	});
};
