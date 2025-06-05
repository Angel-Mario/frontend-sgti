<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  refresh: {
    type: Function,
    required: true,
  },
})
// Emiters definitions
const emit = defineEmits(['close'])

const schema = ReporteSchema()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  asunto: undefined,
  texto: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  const authStore = useAuthStore()
  await $fetch('gestion/reportes/', {
    ...makePostPatchOptions('Se ha registrado correctamente el reporte', dataForm, () => {
      props.refresh() // Actualiza los datos si es necesario
      emit('close', true)
    }, toast, `Bearer ${authStore.getToken}`),
    method: 'POST',
  })
}

// Flag to track if the form has been modified
const isFormDirty = ref(false)

// Watch for changes in the form fields
watch(
  state,
  (newVal, oldVal) => {
    // Check if any of the form fields have changed
    isFormDirty.value = newVal === oldVal
  },
  { deep: true },
)
</script>

<template>
  <UForm
    class="grid grid-cols-1 space-y-4"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      label="Asunto del reporte"
      name="asunto"
      required
    >
      <UTextarea
        v-model="state.asunto"
        :rows="2"
        autoresize
        :maxrows="4"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField
      label="Información"
      name="texto"
      required
    >
      <UTextarea
        v-model="state.texto"
        :rows="6"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <div class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full">
      <UButton
        label="Cancelar"
        color="neutral"
        variant="outline"
        @click="$emit('close')"
      />
      <UButton
        label="Insertar"
        color="neutral"
        type="submit"
        :disabled="!isFormDirty"
      />
    </div>
  </UForm>
</template>
