<template>
	<div class="flex h-screen">
		<Sidebar />
		<slot />
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: "admin",
	pageTitle: "Home",
	pageDescription: "Pagina de inicio",
	pageIcon: "i-lucide-house",
});
useHead({
	title: "Iniciar Sesión",
});
</script>
