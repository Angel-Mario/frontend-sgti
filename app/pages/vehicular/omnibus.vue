<template>
	<div class="flex flex-col w-full h-screen bg-(--ui-bg)">
		<RouteBreadCrumb :items="items">
			<section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
				<h1 class="text-2xl font-bold">Listado de Ómnibus</h1>
				<USeparator
					color="primary"
					type="solid"
				/>
			</section>
			<main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
				<VehicularOmnibusTable />
			</main>
		</RouteBreadCrumb>
	</div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
	layout: "admin",
	pageTitle: "Omnibus",
	pageDescription: "Omnibus",
	pageIcon: "i-lucide-car",
	pageKeywords: "omnibus, vehiculo, admin",
	name: "omnibus",
});

const items: BreadcrumbItem[] = [
	{
		label: "Home",
		to: "/home",
	},
	{
		slot: "dropdown" as const,
		icon: "i-lucide-ellipsis",
		label: "Vehicular",
		children: [
			{
				label: "Omnibus",
				to: "/vehicular/omnibus",
			},
		],
	},
	{
		label: "Omnibus",
		to: "/vehicular/omnibus",
	},
];
</script>
