<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Usuario } from './types'

const props = defineProps({
  usuario: {
    type: Object as () => Usuario,
    default: undefined,
  }
})
const password = z.string().min(8, 'Al menos 8 characters').regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Al menos un número, una letra mayúscula y una letra minúscula')

const schema = z.object({
  nombre_u: z.string().min(3, 'Al menos 3 caracteres').regex(/([a-z])/),
  nombre_apellidos: z.string().min(10, 'Al menos 10 caracteres'),
  correo: z.string().email('No es un correo valido'),
  password: props.usuario ? password.optional() : password,
  telefono: z.string()
    .startsWith('53', { message: "Must start with country code 53" })
    .length(11, { message: "Must be 11 digits including country code" })
    .regex(/^53[0-9]+$/, { message: "Must contain only digits" }).optional(),
  rol: z.string()
})

console.log(props.usuario);
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nombre_u: (props.usuario) ? props.usuario.usuario : undefined,
  nombre_apellidos: (props.usuario) ? props.usuario.nombre : undefined,
  correo: (props.usuario) ? props.usuario.correo : undefined,
  password: undefined,
  telefono: (props.usuario) ? props.usuario.telefono : undefined,
  rol: (props.usuario) ? props.usuario.rol : undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
const items = ref(['Administrador', 'Chofer', 'Suministrador'])
</script>

<template>
  <UForm :schema="schema" :state="state" class="grid grid-cols-9 space-y-4" :validate-on="[]" @submit="onSubmit">
    <UFormField label="Nombre de usuario" name="nombre_u" required class="col-span-4">
      <UInput v-model="state.nombre_u" placeholder="Ex: anibalpg" />
    </UFormField>

    <UFormField label="Contraseña" name="password" :required="!props.usuario" class="col-span-3 col-start-7">
      <UInput v-model="state.password" type="password" :placeholder="props.usuario ? '••••••••••' : 'Ex: Ejemplo!*8'" />
    </UFormField>

    <UFormField label=" Nombre y apellidos" name="nombre_apellidos" required class="col-span-5">
      <UInput v-model="state.nombre_apellidos" placeholder="Ex: Anibal Perez Garcia" />
    </UFormField>

    <UFormField label="Teléfono" name="telefono" class="col-span-3 col-start-7">
      <UInput v-model="state.telefono" placeholder="Ex: 5356463650" />
    </UFormField>
    <UFormField label="Correo" name="correo" required class="col-span-5">
      <UInput v-model="state.correo" placeholder="Ex: anibalpg@uci.cu" />
    </UFormField>
    <UFormField label="Rol" name="rol" required class="col-span-3 col-start-7">
      <USelectMenu v-model="state.rol" :search-input="false" :items="items" class="w-full" />
    </UFormField>

    <div class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full">
      <UButton label="Cancelar" color="neutral" variant="outline" @click="$emit('close')" />
      <UButton label="Insertar" color="neutral" type="submit" />
    </div>
  </UForm>
</template>
