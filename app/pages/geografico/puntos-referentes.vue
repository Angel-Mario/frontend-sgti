<template>
	<div class="flex flex-col w-full h-screen bg-(--ui-bg)">
		<RouteBreadCrumb :items="items">
			<section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
				<h1 class="text-2xl font-bold">Listado de Puntos Referentes</h1>
				<USeparator color="primary" type="solid" />
			</section>
			<main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
				<GeograficoPuntosReferentesTable />
			</main>
		</RouteBreadCrumb>
	</div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
	layout: "authenticated",
	pageTitle: "Puntos Referentes",
	pageDescription: "Lista de Puntos Referentes",
	pageIcon: "i-lucide-user",
	pageKeywords: "puntos referentes, lista, punto referente, admin",
	name: "puntos-referentes",
});

const items: BreadcrumbItem[] = [
	{
		label: "Home",
		to: "/home",
	},
	{
		slot: "dropdown" as const,
		icon: "i-lucide-ellipsis",
		label: "Geográfico",
		children: [
			{
				label: "Puntos Referentes",
				to: "/geografico/puntos-referentes",
			},
			{
				label: "Rutas",
				to: "/geografico/rutas",
			},
			{
				label: "Terminales",
				to: "/geografico/terminales",
			},
			{
				label: "Hojas de ruta",
				to: "/geografico/hojas-ruta",
			},
		],
	},
	{
		label: "Puntos Referentes",
		to: "/geografico/puntos-referentes",
	},
];
</script>
