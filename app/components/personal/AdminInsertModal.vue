<script setup lang="ts">
const props = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
	usuario: {
		type: Object as () => Administrador,
		default: undefined,
	},
});
// Create local mutable copy
const localOpen = ref(props.open);
</script>

<template>
	<UModal
		v-model:open="localOpen"
		:title="
			props.usuario
				? 'Mofificar administrador'
				: 'Añadir un nuevo administrador'
		"
		:ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
		:description="
			props.usuario
				? 'Por favor, introduce los datos del administrador a modificar'
				: 'Por favor, introduce los datos del nuevo administrador'
		"
	>
		<template #body>
			<PersonalAdminInsertForm
				:data="props.usuario"
				@close="localOpen = false"
			/>
		</template>
	</UModal>
</template>
