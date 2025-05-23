<script setup lang="ts">
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as () => Usuario,
    default: undefined,
  },
  refresh: {
    type: Function,
    required: true,
  },
})
// Create local mutable copy
const localOpen = ref(props.open)
</script>

<template>
  <UModal
    v-model:open="localOpen"
    :title="props.data ? 'Mofificar usuario' : 'Añadir un nuevo usuario'"
    :ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
    :description="
      props.data
        ? 'Por favor, introduce los datos del usuario a modificar'
        : 'Por favor, introduce los datos del nuevo usuario'
    "
  >
    <template #body>
      <PersonalUsuarioInsertForm
        :data="props.data"
        :refresh="props.refresh"
        @close="localOpen = false"
      />
    </template>
  </UModal>
</template>
