<template>
	<div class="flex flex-col w-full h-screen bg-(--ui-bg)">
		<RouteBreadCrumb :items="items">
			<section class="flex flex-col w-full row-span-1 px-6 py-3 rounded-2xl">
				<h1 class="text-2xl font-bold">Listado de Usuarios</h1>
				<USeparator color="primary" type="solid" />
			</section>
			<main class="w-full px-3 overflow-hidden row-span-9 rounded-2xl">
				<PersonalUsuariosTable />
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
		label: "Personal",
		to: "/personal",
	},
	{
		label: "Usuarios",
		to: "/personal/usuarios",
	},
];
</script>
