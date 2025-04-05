<script setup lang="ts">
const props = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
	usuario: {
		type: Object as () => Usuario,
		default: undefined,
	},
});
// Create local mutable copy
const localOpen = ref(props.open);
</script>

<template>
	<UModal
		v-model:open="localOpen"
		:title="props.usuario ? 'Mofificar usuario' : 'Añadir un nuevo usuario'"
		:ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
		:description="
			props.usuario
				? 'Por favor, introduce los datos del usuario a modificar'
				: 'Por favor, introduce los datos del nuevo usuario'
		"
	>
		<template #body>
			<PersonalUsuarioInsertForm
				:usuario="props.usuario"
				@close="localOpen = false"
			/>
		</template>
	</UModal>
</template>
