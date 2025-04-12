<template>
	<div
		class="z-20 w-full h-32 bg-(--ui-bg) items-center flex ps-12 border-b-2 border-b-gray-100/70 dark:border-white/25"
	>
		<UBreadcrumb :items="items">
			<template #separator>
				<span class="mx-2 text-(--ui-text-muted)">/</span>
			</template>
		</UBreadcrumb>
	</div>
	<div class="w-full px-3 bg-neutral-850">
		<div class="grid m-2.5 rounded-2xl grid-rows-10 gap-y-3">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";

defineProps({
	items: {
		type: Array<BreadcrumbItem>,
		required: true,
	},
});
</script>

<style></style>
