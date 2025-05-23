<script setup lang="ts">
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as () => Administrador,
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
    :title="
      props.data ? 'Mofificar administrador' : 'Añadir un nuevo administrador'
    "
    :ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
    :description="
      props.data
        ? 'Por favor, introduce los datos del administrador a modificar'
        : 'Por favor, introduce los datos del nuevo administrador'
    "
  >
    <template #body>
      <PersonalAdminInsertForm
        :data="props.data"
        :refresh="props.refresh"
        @close="localOpen = false"
      />
    </template>
  </UModal>
</template>
