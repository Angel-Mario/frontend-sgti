<template>
	<div class="flex flex-col w-full h-screen bg-(--ui-bg)">
		<RouteBreadCrumb :items="items">
			<section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
				<h1 class="text-2xl font-bold">Listado de Usuarios</h1>
				<USeparator color="primary" type="solid" />
			</section>
			<main class="w-full px-3 pb-2 overflow-hidden row-span-10 rounded-2xl">
				<PersonalUsuarioTable />
			</main>
		</RouteBreadCrumb>
	</div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
	layout: "admin",
	pageTitle: "Usuarios",
	pageDescription: "Lista de usuarios",
	pageIcon: "i-lucide-user",
	pageKeywords: "usuarios, lista, usuario, admin",
	name: "usuarios",
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
		label: "Usuarios",
		to: "/personal/usuarios",
	},
];
</script>
