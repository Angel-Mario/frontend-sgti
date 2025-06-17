<script setup lang="ts">
defineProps({
  message: {
    type: String,
  },
  resolve: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits<{ close: [boolean] }>()
const open = ref(false)
</script>

<template>
  <UModal v-model:open="open" title="¿Estás seguro?" :ui="{ footer: 'justify-end' }">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      {{ message }}
    </template>

    <template #footer>
      <UButton
        label="Cancel" color="neutral" variant="outline" @click="
          emit('close', true)
        "
      />
      <UButton
        label="Eliminar" color="error" variant="outline" @click="() => {
          resolve()
          emit('close', true)
        }"
      />
    </template>
  </UModal>
</template>
