<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  refresh: {
    type: Function,
    required: true,
  },
})

const refreshForm = ref(() => {})
defineExpose({ refreshForm })

const schema = SolicitudRefuerzoSchema()

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  terminalNombre: undefined,
  vehiculosMatriculas: undefined,
})

const toast = useToast()
const authStore = useAuthStore()

const query = shallowRef('')
const { data, status, refresh } = useFetch<{
  terminalesSinReinforcements: string[]
  vehiculosSinReinforcements: string[]
}>(
  '/gestion/solicitud-refuerzo/load-form-data',
  makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`),
)

// redefinition refreshForm
refreshForm.value = refresh

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
  }
  console.log(dataForm, 'DataForm')

  await $fetch('gestion/solicitud-refuerzo/', {
    ...makePostPatchOptions(
      'Se ha registrado correctamente la solicitud de refuerzo',
      dataForm,
      () => {
        props.refresh() // Actualiza los datos si es necesario
        state.terminalNombre = undefined
        state.vehiculosMatriculas = undefined
        refresh()
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
    class="grid grid-cols-9 space-y-4 gap-x-3"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <div class="flex col-span-1 mt-6 ml-auto pe-1">
      <UButton
        class="cursor-pointer h-fit w-fit"
        icon="i-custom-broom"
        size="md"
        color="primary"
        variant="soft"
        @click="state.terminalNombre = ''"
      />
    </div>

    <UFormField
      class="col-span-3 pe-2"
      label="Terminal a reforzar"
      name="terminalNombre"
      required
    >
      <USelectMenu
        v-model="state.terminalNombre"
        :items="data?.terminalesSinReinforcements"
        :loading="status === 'pending'"
        class="w-full"
        placeholder="[Asignar Terminal]"
      />
    </UFormField>

    <div class="flex col-span-1 mt-6 ml-auto pe-1">
      <UButton
        class="cursor-pointer h-fit w-fit"
        icon="i-custom-broom"
        size="md"
        color="primary"
        variant="soft"
        @click="state.terminalNombre = ''"
      />
    </div>

    <UFormField
      label="Vehiculos para reforzar"
      name="vehiculosMatriculas"
      class="col-span-3"
      required
    >
      <USelectMenu
        v-model="state.vehiculosMatriculas"
        :items="data?.vehiculosSinReinforcements"
        :loading="status === 'pending'"
        class="w-full"
        placeholder="[Asignar Vehículos]"
        multiple
      />
    </UFormField>

    <div class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full">
      <UButton
        label="Limpiar"
        color="neutral"
        variant="outline"
        @click="() => { state.terminalNombre = undefined, state.vehiculosMatriculas = undefined }"
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
