<template>
	<div class="flex flex-col w-full h-screen bg-(--ui-bg)">
		<RouteBreadCrumb :items="items">
			<section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
				<h1 class="text-2xl font-bold">Listado de Suministradores</h1>
				<USeparator
					color="primary"
					type="solid"
				/>
			</section>
			<main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
				<PersonalSuministradorTable />
			</main>
		</RouteBreadCrumb>
	</div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
	layout: 'authenticated',
	pageTitle: 'Suministradores',
	pageDescription: 'Lista de suministradores',
	pageIcon: 'i-lucide-user-pen',
	pageKeywords: 'suministradores, lista, suministrador, admin',
	name: 'suministradores',
	middleware: ["auth"]
})

useHead({
	title: "Lista de suministradores",
});

const items: BreadcrumbItem[] = [
	{
		label: "Home",
		to: "/home",
	},
	{
		slot: "dropdown" as const,
		icon: "i-lucide-ellipsis",
		label: "Personal",
		children: [
			{
				label: "Usuarios",
				to: "/personal/usuarios",
			},
			{
				label: "Administradores",
				to: "/personal/administradores",
			},
			{
				label: "Choferes",
				to: "/personal/choferes",
			},
			{
				label: "Suministradores",
				to: "/personal/suministradores",
			},
		],
	},
	{
		label: "Suministradores",
		to: "/personal/suministradores",
	},
];
</script>