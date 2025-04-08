<template>
	<div class="grid w-full h-screen mx-3 grid-rows-10 bg-neutral-850 gap-y-3">
		<section class="flex flex-col w-full row-span-1 px-6 py-3 rounded-2xl">
			<h1 class="text-2xl font-bold">Listado de Administradores</h1>
			<USeparator color="primary" type="solid" />
		</section>
		<main class="w-full px-3 overflow-hidden row-span-9 rounded-2xl">
			<PersonalAdminsTable />
		</main>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: "admin",
	pageTitle: "Administradores",
	pageDescription: "Lista de administradores",
	pageIcon: "i-lucide-user-cog",
	pageKeywords: "administradores, lista, administrador, admin",
	name: "administradores",
});
</script>
