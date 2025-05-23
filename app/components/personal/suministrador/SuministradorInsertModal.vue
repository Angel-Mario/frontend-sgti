<script setup lang="ts">
const props = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
	data: {
		type: Object as () => Suministrador,
		default: undefined,
	},
	refresh: {
		type: Function,
		required: true,
	},
});
// Create local mutable copy
const localOpen = ref(props.open);
</script>

<template>
	<UModal
		v-model:open="localOpen"
		:title="
			props.data ? 'Mofificar suministrador' : 'Añadir un nuevo suministrador'
		"
		:ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
		:description="
			props.data
				? 'Por favor, introduce los datos del suministrador a modificar'
				: 'Por favor, introduce los datos del nuevo suministrador'
		"
	>
		<template #body>
			<PersonalSuministradorInsertForm
				:data="props.data"
				:refresh="props.refresh"
				@close="localOpen = false"
			/>
		</template>
	</UModal>
</template>
