<template>
	<div class="flex justify-center w-full h-screen">
		<Home />
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: "authenticated",
	pageTitle: "Home",
	pageDescription: "Pagina de inicio",
	pageIcon: "i-lucide-house",
	middleware: ["auth"]
});
useHead({
	title: "Home",
});
</script>
