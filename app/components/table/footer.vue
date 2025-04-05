<script lang="ts" setup>
const props = defineProps({
	rowSelected: {
		type: Number,
		default: 0,
	},
	totalItems: {
		type: Number,
		default: 0,
	},
});
</script>

<template>
	<div
		class="px-4 py-3.5 border-t border-(--ui-border-accented) text-sm text-(--ui-text-muted)"
	>
		{{ rowSelected }}
		de
		{{ totalItems }}
		fila(s) seleccionadas.
	</div>
</template>

<style></style>
