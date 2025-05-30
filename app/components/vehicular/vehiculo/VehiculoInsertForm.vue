<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  data: {
    type: Object as () => Vehiculo,
    default: undefined,
  },
  refresh: {
    type: Function,
    required: true,
  },
})
// Emiters definitions
const emit = defineEmits(['close'])

const schema = VehiculoSchema()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  año: props.data ? props.data.año || undefined : undefined,
  capacidad: props.data ? props.data.capacidad || undefined : undefined,
  consumo: props.data ? props.data.consumo || undefined : undefined,
  marca: props.data ? props.data.marca : undefined,
  matricula: props.data ? props.data.matricula : undefined,
  modelo: props.data ? props.data.modelo || undefined : undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  const authStore = useAuthStore()
  await $fetch(`vehicular/vehiculos/${props.data ? props.data.id : ''}`, {
    ...makePostPatchOptions(
      props.data
        ? 'Actualizado correctamente el vehículo'
        : 'Se ha registrado correctamente vehículo',
      dataForm,
      () => {
        props.refresh() // Actualiza los datos si es necesario
        emit('close', true)
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
// this cheks for optional changes
whenever(
  () => (state.modelo === ''),
  () => {
    state.modelo = undefined
  },
)

whenever(
  // @ts-expect-error Esto es un hack para que el consumo se limpie
  () => (state.consumo === ''),
  () => {
    state.consumo = undefined
  },
)
whenever(
  // @ts-expect-error Esto es un hack para que el consumo se limpie
  () => (state.capacidad === ''),
  () => {
    state.capacidad = undefined
  },
)
whenever(
  // @ts-expect-error Esto es un hack para que el consumo se limpie
  () => (state.año === ''),
  () => {
    state.año = undefined
  },
)
</script>

<template>
  <UForm
    class="grid grid-cols-9 space-y-4"
    :schema="schema"
    :state="state"
    :validate-on="[]"
    @submit="onSubmit"
  >
    <UFormField
      class="col-span-4"
      label="Matrícula"
      name="matricula"
      required
    >
      <UInput v-model="state.matricula" placeholder="Ex: B-123456" />
    </UFormField>

    <UFormField
      label="Consumo (litros/100km)"
      name="consumo"
      class="col-span-3 col-start-7"
    >
      <UInput
        v-model="state.consumo"
        type="number"
        placeholder="Ex: 5"
      />
    </UFormField>

    <UFormField
      label="Marca"
      name="marca"
      required
      class="col-span-5"
    >
      <UInput v-model="state.marca" placeholder="Ex: Mercedes" />
    </UFormField>

    <UFormField label="Capacidad (pasajeros)" name="capacidad" class="col-span-3 col-start-7">
      <UInput v-model="state.capacidad" type="number" placeholder="Ex: 15" />
    </UFormField>
    <UFormField label="Modelo" name="modelo" class="col-span-5">
      <UInput v-model="state.modelo" placeholder="Ex: A-15" />
    </UFormField>
    <UFormField
      label="Año"
      name="año"
      class="col-span-3 col-start-7"
    >
      <UInput v-model="state.año" type="number" placeholder="1999" />
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
