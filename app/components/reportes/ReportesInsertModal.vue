<script setup lang="ts">
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
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
    title="Añadir un nuevo reporte"
    :ui="{ content: 'sm:max-w-xl', wrapper: 'sm:max-w-xl' }"
    description="Por favor, introduce los datos del nuevo reporte
    "
  >
    <template #body>
      <ReportesInsertForm
        :refresh="props.refresh"
        @close="localOpen = false"
      />
    </template>
  </UModal>
</template>
