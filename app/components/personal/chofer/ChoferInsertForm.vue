<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  data: {
    type: Object as () => Chofer,
    default: undefined,
  },
  refresh: {
    type: Function,
    required: true,
  },
})
// Emiters definitions
const emit = defineEmits(['close'])

const schema = ChoferSchema(!!props.data)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nombre_u: props.data ? props.data.nombre_u : undefined,
  fullName: props.data ? props.data.fullName : undefined,
  carnet: props.data ? props.data.carnet : undefined,
  correo: props.data ? props.data.correo : undefined,
  password: undefined,
  telefono: props.data && props.data.telefono === '' ? props.data.telefono : undefined,
  residencia: props.data?.residencia
    ? props.data.residencia.toString()
    : undefined,
  rutaNombre: props.data ? props.data.ruta?.nombre : undefined,
  vehiculoMatricula: props.data ? props.data.vehiculo?.matricula : undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  await $fetch(`personal/choferes/${props.data ? props.data.id : ''}`, {
    ...makePostPatchOptions(
      props.data
        ? 'Actualizado correctamente el chofer'
        : 'Se ha registrado correctamente el chofer',
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
const { data: itemsRutaData, status: statusRuta } = useFetch<string[]>(
  '/geografico/rutas/simplex',
  makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`),
)
const { data: itemsMatriculasData, status: statusMatricula } = useFetch<
  string[]
>(
  '/vehicular/vehiculos/simplex',
  makeFetchOptions(query, toast, `Bearer ${authStore.token}`),
)

const itemsRutaNombre = ref(itemsRutaData.value)
const itemsMatricula = ref(itemsMatriculasData.value)

watch(itemsRutaData, () => {
  itemsRutaNombre.value = itemsRutaData.value
})
watch(itemsMatriculasData, () => {
  itemsMatricula.value = itemsMatriculasData.value
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
// this cheks for optional changes
whenever(
  () => state.telefono === '',
  () => {
    state.telefono = undefined
  },
)
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="grid grid-cols-9 space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      label="Nombre de usuario"
      name="nombre_u"
      :required="!props.data"
      class="col-span-4"
    >
      <UInput
        v-model="state.nombre_u"
        autocomplete="off"
        placeholder="Ej: anibalpg"
      />
    </UFormField>

    <UFormField
      label="Contraseña"
      name="password"
      :required="!props.data"
      class="col-span-3 col-start-7"
    >
      <UInput
        v-model="state.password"
        type="password"
        autocomplete="off"
        :placeholder="props.data ? '••••••••••' : 'Ej: Ejemplo!*8'"
      />
    </UFormField>

    <UFormField
      label="Nombre y apellidos"
      name="nombre_apellidos"
      required
      class="col-span-5"
    >
      <UInput v-model="state.fullName" placeholder="Ej: Anibal Perez Garcia" />
    </UFormField>

    <UFormField label="Teléfono" name="telefono" class="col-span-3 col-start-7">
      <UInput v-model="state.telefono" placeholder="Ej: 56463650" />
    </UFormField>
    <UFormField label="Correo" name="correo" required class="col-span-5">
      <UInput v-model="state.correo" placeholder="Ej: anibalpg@uci.cu" />
    </UFormField>
    <UFormField
      label="Carnet"
      name="carnet"
      required
      class="col-span-3 col-start-7"
    >
      <UInput v-model="state.carnet" :maxlength="11" placeholder="96124215561">
        <template #trailing>
          <div
            id="character-count"
            class="text-xs text-muted tabular-nums"
            aria-live="polite"
            role="status"
          >
            {{ state.carnet?.length }}/11
          </div>
        </template>
      </UInput>
    </UFormField>
    <UFormField label="Residencia" name="residencia" class="col-span-4">
      <UInput
        v-model="state.residencia"
        placeholder="Ej: Cotorro e/ 39 y 41 #2680"
      />
    </UFormField>
    <div class="flex items-end justify-end col-span-1 col-start-6 pe-1">
      <UButton
        class="cursor-pointer h-fit w-fit"
        icon="i-custom-broom"
        size="md"
        color="primary"
        variant="soft"
        @click="state.vehiculoMatricula = ''"
      />
    </div>

    <UFormField
      label="Vehículo asignado"
      name="vehiculoMatricula"
      class="col-span-3 col-start-7"
    >
      <USelectMenu
        v-model="state.vehiculoMatricula"
        :items="itemsMatricula"
        :loading="statusMatricula === 'pending'"
        class="w-full"
        placeholder="[Asignar Vehículo]"
      />
    </UFormField>

    <div class="flex items-end justify-end col-span-1 col-start-6 pe-1">
      <UButton
        class="cursor-pointer h-fit w-fit"
        icon="i-custom-broom"
        size="md"
        color="primary"
        variant="soft"
        @click="state.rutaNombre = ''"
      />
    </div>

    <UFormField
      label="Ruta asignada"
      name="rutaNombre"
      class="col-span-3 col-start-7"
    >
      <USelectMenu
        v-model="state.rutaNombre"
        :items="itemsRutaNombre"
        :loading="statusRuta === 'pending'"
        class="w-full"
        placeholder="[Asignar Ruta]"
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
