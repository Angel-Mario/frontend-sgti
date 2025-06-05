<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'
import { LazyGeograficoLeafletModalEdit } from '#components'

const schema = SolicitudApoyoCercanoSchema()
type Schema = z.output<typeof schema>

const toast = useToast()

const authStore = useAuthStore()
const query = shallowRef('')

const { data, refresh } = useFetch<{
  id: string
  fecha: Date
  descripcion: string
  latLong: string
}[]>(
  '/vehicular/solicitudes-apoyo/load-solicitud-apoyo-form-data',
  { ...makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`) },
)

const state = reactive<Partial<Schema>>({
  descripcion: undefined,
  latLong: undefined,
})
watch(data, () => {
  if (data.value && data.value.length > 0) {
    state.descripcion = data.value[0]?.descripcion
    state.latLong = data.value[0]?.latLong
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  await $fetch(`vehicular/solicitudes-apoyo/`, {
    ...makePostPatchOptions(
      'Se ha registrado correctamente la solicitud de ayuda',
      dataForm,
      () => {
        // refresh() Actualiza los datos si es necesario
        refresh()
      },
      toast,
      `Bearer ${authStore.getToken}`,
    ),
    method: 'POST',
    lazy: false,
  })
}
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
const overlay = useOverlay()
const modalMap = overlay.create(LazyGeograficoLeafletModalEdit, {
  props: {
    open: false,
    sendData: async (data: { latLong: string }) => {
      state.latLong = data.latLong
    },
    locations: [],
  },
})
async function openModal() {
  if (state.latLong) {
    const latLong = state.latLong?.split(',')
    const lat = Number(latLong[0])
    const lng = Number(latLong[1])
    if (state.latLong && lat && lng) {
      modalMap.patch({
        open: true,
        locations: [{ name: 'Ubicación actual', lat, lng }],
        center: [lat, lng],
        title: `Editar ubicación actual [${latLong}]`,
      })
    }
  }
  else {
    modalMap.patch({
      open: true,
      locations: [],
      title: 'Toca donde te encuentres',
    })
  }
  modalMap.open()
}
</script>

<template>
  <div class="flex flex-col w-full h-fit max-h-full border-2 border-(--ui-border) rounded-2xl">
    <div class="flex flex-col gap-y-2 justify-start  overflow-y-auto px-4 py-3.5 gap-x-3 border-(--ui-border-accented) cool-scrollbar-dark">
      <h1 class="mx-2 text-xl font-bold">
        {{ data && data?.length > 0 ? `Solicitud actual hecha el ${data[0]?.fecha}` : 'Registrar de Solicitud de Ayuda' }}
      </h1>
      <UForm
        class="grid grid-cols-9 space-y-4"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField
          class="col-span-5 pe-2"
          label="Descripción"
          name="descripcion"
          required
        >
          <UInput v-model="state.descripcion" placeholder="Ex: Falta de combustible" />
        </UFormField>

        <UFormField
          label="Latitud y Longitud"
          name="latLong"
          required
          class="col-span-3 col-start-6 ml-4"
        >
          <UInput v-model="state.latLong" placeholder="Ex: 19.4376, -98.5076" />
        </UFormField>
        <div class="col-span-1 mt-6 ml-6 ps-1">
          <UButton
            class="cursor-pointer h-fit w-fit"
            icon="i-lucide-map"
            size="md"
            color="primary"
            variant="soft"
            @click="openModal"
          />
        </div>

        <div
          class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full"
        >
          <UButton
            label="Cancelar"
            color="neutral"
            variant="outline"
            :disabled="!data || data?.length === 0"
            @click="handleDeleteRows(
              'vehicular/solicitudes-apoyo/',
              refresh,
              () => {
                state.descripcion = undefined
                state.latLong = undefined
              },
              // @ts-ignore
              [{ id: data[0]?.id as string }],
              authStore.token ? `Bearer ${authStore.token}` : '',
            )"
          />
          <UButton
            label="Solicitar"
            color="neutral"
            type="submit"
            :disabled="!isFormDirty || data && data?.length > 0"
          />
        </div>
      </UForm>
      <UCollapsible v-if="data && data?.length > 0" class="flex flex-col w-full gap-2">
        <UButton
          class="group"
          label="Ubicación de la solicitud actual"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
          block
        />

        <template #content>
          <ClientOnly>
            <GeograficoLeaflet
              :locations="data[0]?.latLong ? [{ name: 'Ubicación actual', lat: Number(data[0]?.latLong?.split(',')[0]), lng: Number(data[0]?.latLong?.split(',')[1]) }] : []"
              :center="[Number(data[0]?.latLong?.split(',')[0]), Number(data[0]?.latLong?.split(',')[1])]" size="440px"
            />
          </ClientOnly>
        </template>
      </UCollapsible>
    </div>
  </div>
</template>
