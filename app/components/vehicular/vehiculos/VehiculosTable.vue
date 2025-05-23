<template>
	<TableMain
		ref="child"
		:columns="columns"
		:default-sorting-value="defaultSortingValue"
		:fetch-route="fetchRoute"
		:filter-options="filterOptions"
		@open-insert-modal="openInsertModal"
	/>
</template>

<script lang="ts" setup>
import { LazyVehicularVehiculosInsertModal } from "#components";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
//TODO: order by Matricula asc verificar que funciona en la tabla
const childRef = useTemplateRef("child");
const router = useRouter();

const filterOptions = [
	{ id: "id", label: "Id" },
	{ id: "matricula", label: "Matrícula" },
	{ id: "consumo", label: "Consumo" },
	{ id: "capacidad", label: "Capacidad" },
	{ id: "marca", label: "Marca" },
	{ id: "modelo", label: "Modelo" },
	{ id: "año", label: "Año" },
	{ id: "chofer", label: "Chofer" },
];
const fetchRoute = "vehicular/vehiculos";
const defaultSortingValue = "Matrícula";

//Table UI Component Resolvers
const UButton = resolveComponent("UButton");
const UIcon = resolveComponent("UIcon");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");

//Overlay Hooks
const overlay = useOverlay();
const toast = useToast();

//Modal for Insert Item
const modal = overlay.create(LazyVehicularVehiculosInsertModal, {
	props: {
		open: false,
		data: undefined,
		refresh: childRef?.value?.refreshMet
			? childRef?.value?.refreshMet
			: () => {},
	},
});

const openInsertModal = async () => {
	modal.patch({
		open: true,
		refresh: childRef?.value?.refreshMet
			? childRef?.value?.refreshMet
			: () => {},
		data: undefined,
	});
	await modal.open();
};

//Row Dropdown definition
function getRowItems(row: Row<Vehiculo>) {
	return [
		{
			label: "Editar",
			icon: "i-lucide-pencil",
			async onSelect() {
				modal.patch({
					open: true,
					refresh: childRef?.value?.refreshMet
						? childRef?.value?.refreshMet
						: () => {},
					data: row.original,
				});
				await modal.open();
			},
		},
		{
			label: "Eliminar",
			icon: "i-lucide-trash",
			onSelect() {
				handleDeleteRows(
					fetchRoute,
					childRef?.value?.refreshMet ? childRef?.value?.refreshMet : () => {},
					childRef?.value?.deleteSelection
						? childRef?.value?.deleteSelection
						: () => {},
					[{ id: row.original.id }],
				);
			},
		},
		{
			type: "separator",
		},
		{
			label: "Copiar matrícula",
			icon: "i-lucide-copy",
			onSelect() {
				navigator.clipboard.writeText(row.original.matricula);

				toast.add({
					title: "La matrícula ha sido copiada al portapapeles",
					color: "success",
					icon: "i-lucide-circle-check",
				});
			},
		},
		// {
		// 	label: "Ver detalles",
		// 	icon: "i-lucide-eye",
		// },
	];
}

//Const Columns  Table
const columns: TableColumn<Vehiculo>[] = [
	makeColumnSelect<Vehiculo>(UCheckbox),
	{
		accessorKey: "id",
		header: "Id",
		id: "Id",
	},
	{
		accessorKey: "matricula",
		header: ({ column }) => makeColumnHeader(column, "Matrícula", UButton),
		id: "Matrícula",
		meta: {
			class: {
				td: "text-center",
				th: "text-center",
			},
		},
	},
	{
		accessorKey: "consumo",
		header: ({ column }) => makeColumnHeader(column, "Consumo", UButton),
		cell: ({ row }) =>
			row.getValue("Consumo")
				? `${row.getValue("Consumo")}L/100km`
				: "[Sin datos]",
		id: "Consumo",
		meta: {
			class: {
				td: "text-center",
				th: "text-center",
			},
		},
	},
	{
		accessorKey: "capacidad",
		header: ({ column }) => makeColumnHeader(column, "Capacidad", UButton),
		cell: ({ row }) =>
			row.getValue("Capacidad")
				? `${row.getValue("Capacidad")} pasajeros`
				: "[Sin datos]",
		id: "Capacidad",
		meta: {
			class: {
				td: "text-center",
				th: "text-center",
			},
		},
	},
	{
		accessorKey: "marca",
		header: ({ column }) => makeColumnHeader(column, "Marca", UButton),
		cell: ({ row }) =>
			row.getValue("Marca") ? row.getValue("Marca") : "[Sin datos]",
		id: "Marca",
		meta: {
			class: {
				td: "text-center",
				th: "text-center",
			},
		},
	},
	{
		accessorKey: "modelo",
		header: ({ column }) => makeColumnHeader(column, "Modelo", UButton),
		cell: ({ row }) =>
			row.getValue("Modelo") ? row.getValue("Modelo") : "[Sin datos]",
		id: "Modelo",
		meta: {
			class: {
				td: "text-center",
				th: "text-center",
			},
		},
	},
	{
		accessorKey: "año",
		header: ({ column }) => makeColumnHeader(column, "Año", UButton),
		cell: ({ row }) =>
			row.getValue("Año") ? row.getValue("Año") : "[Sin datos]",
		id: "Año",
		meta: {
			class: {
				td: "text-center",
				th: "text-center",
			},
		},
	},

	{
		accessorKey: "chofer",
		header: ({ column }) => makeColumnHeader(column, "Chofer", UButton),
		cell: ({ row }) =>
			row.getValue("Chofer")
				? h(
						UButton,
						{
							color: "primary",
							variant: "solid",
							size: "md",
							class: "text-xs cursor-pointer",
							onClick: () => {
								router.push(
									`/personal/choferes?column=id&search=${(row.getValue("Chofer") as VehiculoChofer).id}`,
								);
							},
						},
						() => h(UIcon, { name: "i-lucide-square-arrow-out-up-right" }),
					)
				: "No asignado",
		id: "Chofer",
		meta: {
			class: {
				td: "text-center",
				th: "text-center",
			},
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "text-right" },
				h(
					UDropdownMenu,
					{
						content: {
							align: "end",
						},
						items: getRowItems(row),
						"aria-label": "Actions dropdown",
					},
					() =>
						h(UButton, {
							icon: "i-lucide-ellipsis-vertical",
							color: "neutral",
							variant: "ghost",
							class: "ml-auto",
							"aria-label": "Actions dropdown",
						}),
				),
			);
		},
	},
];
</script>
