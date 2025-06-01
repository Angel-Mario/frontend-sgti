<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  refresh: {
    type: Function,
    required: true,
  },
})

const schema = SolicitudPiezaSchema()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  tipo: undefined,
  cantidad: undefined,
})

const toast = useToast()
const authStore = useAuthStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  await $fetch('vehicular/solicitudes-piezas/', {
    ...makePostPatchOptions(
      'Se ha registrado correctamente la solicitud de pieza',
      dataForm,
      () => {
        props.refresh() // Actualiza los datos si es necesario
        state.tipo = undefined
        state.cantidad = undefined
      },
      toast,
      `Bearer ${authStore.getToken}`,
    ),
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
    class="grid grid-cols-8 space-y-4 gap-x-3"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      class="col-span-5 pe-2"
      label="Tipo de pieza"
      name="tipo"
      required
    >
      <UInput
        v-model="state.tipo"
        placeholder="Ej: Cigüeñal"
      />
    </UFormField>

    <UFormField
      label="Cantidad de piezas"
      name="cantidad"
      class="col-span-3"
    >
      <UInput
        v-model="state.cantidad"
        type="number"
        placeholder="Ex: 2"
      />
    </UFormField>

    <div class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full">
      <UButton
        label="Limpiar"
        color="neutral"
        variant="outline"
        @click="() => { state.tipo = undefined, state. cantidad = undefined }"
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
