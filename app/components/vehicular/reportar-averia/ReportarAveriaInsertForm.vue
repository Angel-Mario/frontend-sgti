<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  refresh: {
    type: Function,
    required: true,
  },
})

const schema = AveriaSchema()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  complejidad: undefined,
  descripcion: undefined,
  tipo: undefined,
  piezas_necesarias: undefined,
})

const toast = useToast()
const authStore = useAuthStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  await $fetch('vehicular/averias/', {
    ...makePostPatchOptions(
      'Se ha registrado correctamente la avería',
      dataForm,
      () => {
        props.refresh() // Actualiza los datos si es necesario
        state.complejidad = undefined
        state.descripcion = undefined
        state.tipo = undefined
        state.piezas_necesarias = undefined
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
whenever(
  () => state.tipo === '',
  () => {
    state.tipo = undefined
  },
)
whenever(
  () => state.piezas_necesarias === '',
  () => {
    state.piezas_necesarias = undefined
  },
)

const items = ref(['Baja', 'Media', 'Alta'])
</script>

<template>
  <UForm
    class="grid grid-cols-8 space-y-4 gap-x-3"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      class="col-span-4 pe-2"
      label="Complejidad"
      name="complejidad"
      required
    >
      <USelectMenu
        v-model="state.complejidad"
        :search-input="false"
        :items="items"
        class="w-full"
      />
    </UFormField>
    <UFormField
      class="col-span-4 pe-2"
      label="Tipo"
      name="tipo"
    >
      <UInput
        v-model="state.tipo"
        placeholder="Ej: Motor"
      />
    </UFormField>
    <UFormField
      class="col-span-4 pe-2"
      label="Descripción"
      name="descripcion"
      required
    >
      <UTextarea
        v-model="state.descripcion"
        :rows="2"
        placeholder="Ej: Motor roto"
        autoresize
        :maxrows="4"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField
      class="col-span-4 pe-2"
      label="Piezas Necesarias"
      name="piezas_necesarias"
    >
      <UTextarea
        v-model="state.piezas_necesarias"
        placeholder="Ej: Motor"
        :rows="2"
        autoresize
        :maxrows="4"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <div class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full">
      <UButton
        label="Limpiar"
        color="neutral"
        variant="outline"
        @click="() => { state.complejidad = undefined, state.descripcion = undefined, state.tipo = undefined, state.piezas_necesarias = undefined }
        "
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
