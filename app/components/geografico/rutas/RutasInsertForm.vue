<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  data: {
    type: Object as () => Ruta,
    default: undefined,
  },
  refresh: {
    type: Function,
    required: true,
  },
})
// Emiters definitions
const emit = defineEmits(['close'])

const schema = RutaSchema()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nombre: props.data ? props.data.nombre : undefined,
  distancia: props.data ? Number(props.data.distancia) : undefined,
  hora_regreso: props.data ? props.data.hora_regreso : '',
  hora_salida: props.data ? props.data.hora_salida : '',
  puntoRegreso: props.data ? props.data.puntoRegreso.nombre : undefined,
  puntoSalida: props.data ? props.data.puntoSalida.nombre : undefined,
})

const toast = useToast()
const authStore = useAuthStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  await $fetch(`geografico/rutas/${props.data ? props.data.id : ''}`, {
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
      `Bearer ${authStore.getToken}`,
    ),
    method: 'POST',
  })
}
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
    class="grid grid-cols-8 space-y-4"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      class="col-span-4 pe-2"
      label="Nombre de la Ruta"
      name="nombre"
      required
    >
      <UInput v-model="state.nombre" placeholder="Ex: Cotorro-UCI" />
    </UFormField>

    <UFormField label="Distancia (km)" name="distancia" class="col-span-3 col-start-6" required>
      <UInput v-model="state.distancia" type="number" placeholder="Ej: 15" />
    </UFormField>

    <UFormField label="Hora salida" name="hora_salida" class="col-span-2" required>
      <UInput v-model="state.hora_salida" placeholder="Ej: 10:00" />
    </UFormField>

    <div class="flex items-end justify-end col-span-1 col-start-4 pe-1">
      <UButton
        class="cursor-pointer h-fit w-fit"
        icon="i-custom-broom"
        size="md"
        color="primary"
        variant="soft"
        @click="state.puntoSalida = ''"
      />
    </div>

    <UFormField
      label="Punto Salida"
      name="punto_salida"
      class="col-span-4 col-start-5"
      required
    >
      <USelectMenu
        v-model="state.puntoSalida"
        :items="itemsPuntoRefNombre"
        :loading="statusPuntoRef === 'pending'"
        class="w-full"
        placeholder="[Punto Salida]"
      />
    </UFormField>

    <UFormField
      label="Hora regreso" name="hora_regreso" class="col-span-2"
      required
    >
      <UInput v-model="state.hora_regreso" placeholder="Ej: 18:00" />
    </UFormField>

    <div class="flex items-end justify-end col-span-1 col-start-4 pe-1">
      <UButton
        class="cursor-pointer h-fit w-fit"
        icon="i-custom-broom"
        size="md"
        color="primary"
        variant="soft"
        @click="state.puntoRegreso = ''"
      />
    </div>

    <UFormField
      label="Punto Regreso"
      name="punto_regreso"
      class="col-span-4 col-start-5"
      required
    >
      <USelectMenu
        v-model="state.puntoRegreso"
        :items="itemsPuntoRefNombre"
        :loading="statusPuntoRef === 'pending'"
        class="w-full"
        placeholder="[Punto Regreso]"
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
