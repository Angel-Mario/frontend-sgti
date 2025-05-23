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
})
</script>

<template>
  <div
    class="px-4 py-1 border-t border-(--ui-border-accented) text-sm text-(--ui-text-muted)"
  >
    {{ props.rowSelected }}
    de
    {{ props.totalItems }}
    fila(s) seleccionadas.
  </div>
</template>
