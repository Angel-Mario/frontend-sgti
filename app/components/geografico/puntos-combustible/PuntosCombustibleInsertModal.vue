<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as () => PuntoComb,
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
        ? 'Modificar punto de combustible'
        : 'Añadir un nuevo punto de combustible'
    "
    :ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
    :description="
      props.data
        ? 'Por favor, introduce los datos del punto de combustible a modificar'
        : 'Por favor, introduce los datos del nuevo punto de combustible'
    "
  >
    <template #body>
      <GeograficoPuntosCombustibleInsertForm
        :data="props.data"
        :refresh="props.refresh"
        @close="localOpen = false"
      />
    </template>
  </UModal>
</template>
