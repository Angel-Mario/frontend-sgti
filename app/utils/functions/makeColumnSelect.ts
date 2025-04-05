import type { TableColumn } from "@nuxt/ui";
import type { ComputedOptions, ConcreteComponent, MethodOptions } from "vue";

//prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
export const makeColumnSelect=	<T> ( uCheckbox: string | ConcreteComponent<object, any, any, ComputedOptions, MethodOptions, {}, any>):TableColumn<T> => {

	return {
		id: "select",
		accessorKey: "select",
		header: ({ table }) =>
			h(uCheckbox, {
				modelValue: table.getIsSomePageRowsSelected()
					? "indeterminate"
					: table.getIsAllPageRowsSelected(),
				"onUpdate:modelValue": (value: boolean | "indeterminate") =>
					table.toggleAllPageRowsSelected(!!value),
				"aria-label": "Select all",
			}),
		cell: ({ row }) =>
			h(uCheckbox, {
				modelValue: row.getIsSelected(),
				"onUpdate:modelValue": (value: boolean | "indeterminate") =>
					row.toggleSelected(!!value),
				"aria-label": "Select row",
			}),
	}
};
