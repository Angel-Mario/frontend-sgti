<script lang="ts" setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as () => Terminal,
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
        ? 'Mofificar terminal'
        : 'Añadir una nueva termial'
    "
    :ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
    :description="
      props.data
        ? 'Por favor, introduce los datos de la terminal a modificar'
        : 'Por favor, introduce los datos de la nueva terminal'
    "
  >
    <template #body>
      <GeograficoTerminalesInsertForm
        :data="props.data"
        :refresh="props.refresh"
        @close="localOpen = false"
      />
    </template>
  </UModal>
</template>
