<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as () => Ruta,
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
      props.data
        ? 'Mofificar ruta'
        : 'Añadir una nueva ruta'
    "
    :ui="{ content: 'sm:max-w-md', wrapper: 'sm:max-w-md' }"
    :description="
      props.data
        ? 'Por favor, introduce los datos de la ruta a modificar'
        : 'Por favor, introduce los datos de la nueva ruta'
    "
  >
    <template #body>
      <GeograficoRutasInsertForm
        :data="props.data"
        :refresh="props.refresh"
        @close="localOpen = false"
      />
    </template>
  </UModal>
</template>
