<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  data: {
    type: Object as () => Terminal,
    default: undefined,
  },
  refresh: {
    type: Function,
    required: true,
  },
})
// Emiters definitions
const emit = defineEmits(['close'])

const schema = TerminalSchema()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nombre: props.data ? props.data.nombre : undefined,
  puntoRef: props.data ? props.data.puntoRef.nombre : undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  await $fetch(`geografico/terminales/${props.data ? props.data.id : ''}`, {
    ...makePostPatchOptions(
      props.data
        ? 'Actualizado correctamente la ruta'
        : 'Se ha registrado correctamente la ruta',
      dataForm,
      () => {
        props.refresh() // Actualiza los datos si es necesario
        emit('close', true)
      },
      toast,
    ),
    method: 'POST',
  })
}
const authStore = useAuthStore()
const query = shallowRef('')
const { data: itemsPuntoRefData, status: statusPuntoRef } = useFetch<string[]>(
  '/geografico/puntos-ref/simplex',
  makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`),
)
const itemsPuntoRefNombre = ref(itemsPuntoRefData.value)

watch(itemsPuntoRefData, () => {
  itemsPuntoRefNombre.value = itemsPuntoRefData.value
})

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
    class="grid grid-cols-9 space-y-4"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      class="col-span-5 pe-2"
      label="Nombre de la Terminal"
      name="nombre"
      required
    >
      <UInput v-model="state.nombre" placeholder="Ex: Terminal Ómnibus de la Habana" />
    </UFormField>

    <UFormField
      label="Punto Referente"
      name="puntoRef"
      class="col-span-4 col-start-6"
      required
    >
      <USelectMenu
        v-model="state.puntoRef"
        :items="itemsPuntoRefNombre"
        :loading="statusPuntoRef === 'pending'"
        class="w-full"
        placeholder="[Punto Referente]"
      />
    </UFormField>

    <div
      class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full"
    >
      <UButton
        label="Cancelar"
        color="neutral"
        variant="outline"
        @click="$emit('close')"
      />
      <UButton
        :label="data ? 'Actualizar' : 'Insertar'"
        color="neutral"
        type="submit"
        :disabled="!isFormDirty"
      />
    </div>
  </UForm>
</template>
