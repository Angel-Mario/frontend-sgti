<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'

const props = defineProps({
  data: {
    type: Object as () => Usuario,
    default: undefined,
  },
  refresh: {
    type: Function,
    required: true,
  },
})
// Emiters definitions
const emit = defineEmits(['close'])

const schema = UsuarioSchema(!!props.data)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nombre_u: props.data ? props.data.nombre_u : undefined,
  fullName: props.data ? props.data.fullName : undefined,
  carnet: props.data ? props.data.carnet : undefined,
  correo: props.data ? props.data.correo : undefined,
  password: undefined,
  telefono:
		props.data && props.data.telefono === '' ? props.data.telefono : undefined,
  rol: props.data
    ? props.data.roles[0] === 'admin'
      ? 'Administrador'
      : props.data.roles[0] === 'chofer'
        ? 'Chofer'
        : 'Suministrador'
    : undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault() // Evita que el formulario se envíe de forma predeterminada

  const dataForm = {
    ...event.data,
    rol: undefined,
    roles: [
      event.data.rol === 'Administrador'
        ? 'admin'
        : event.data.rol === 'Chofer'
          ? 'chofer'
          : 'suministrador',
    ],
  }
  console.log(dataForm, 'DataForm')

  await $fetch(`personal/usuarios/${props.data ? props.data.id : ''}`, {
    ...makePostPatchOptions(
      props.data
        ? 'Actualizado correctamente el usuario'
        : 'Se ha registrado correctamente el usuario',
      dataForm,
      () => {
        props.refresh() // Actualiza los datos si es necesario
        emit('close', true)
      },
      toast,
    ),
    method: 'POST',
  })
  // Si el usuario es el actual, actualiza el usuario
  if (props.data?.nombre_u === useAuthStore().user?.nombre_u) {
    useAuthStore().fetchUser()
  }
}
const items = ref(['Administrador', 'Chofer', 'Suministrador'])

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
    class="grid grid-cols-9 space-y-4"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UFormField
      class="col-span-4"
      label="Nombre de usuario"
      name="nombre_u"
      required
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
        autocomplete="off"
        type="password"
        :placeholder="props.data ? '••••••••••' : 'Ej: Ejemplo!*8'"
      />
    </UFormField>

    <UFormField
      label="Nombre y apellidos"
      name="fullName"
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

    <UFormField label="Rol" name="rol" required class="col-span-3 col-start-7">
      <USelectMenu
        v-model="state.rol"
        :search-input="false"
        :items="items"
        class="w-full"
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
