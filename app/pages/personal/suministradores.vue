<template>
	<div class="w-full bg-neutral-850">
		Admin-Suministradores
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'authenticated',
	pageTitle: 'Suministradores',
	pageDescription: 'Lista de suministradores',
	pageIcon: 'i-lucide-user-pen',
	pageKeywords: 'suministradores, lista, suministrador, admin',
	name: 'suministradores',
})
useHead({
	title: "Lista de suministradores",
});
</script>