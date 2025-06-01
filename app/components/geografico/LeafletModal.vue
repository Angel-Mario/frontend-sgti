<script setup lang="ts">
const props = defineProps({
  zoom: {
    type: Number,
    default: 14,
    required: false,
  },
  center: {
    type: Array<number>,
    default: () => [22.9919, -82.466039],
  },
  bounds: {
    type: Array<number[]>,
    default: [
      [22.9522, -82.5594],
      [23.1976, -82.2371],
    ],
    required: false,
  },
  locations: {
    type: Array<{ name: string, lat: number, lng: number }>,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
    required: false,
  },
  title: {
    type: String,
    default: 'Punto',
    required: false,
  },
})
const localOpen = ref(props.open)

// When the map is ready
</script>

<template>
  <UModal
    v-model:open="localOpen"
    :title="title"
    :ui="{
      content: 'sm:max-w-4xl w-11/12 xl:w-9/12 max-w-full',
      wrapper: 'sm:max-w-xl',
    }"
  >
    <template #body>
      <GeograficoLeaflet :locations="locations" :zoom="zoom" :center="center" :bounds="bounds" />
    </template>
  </UModal>
</template>
