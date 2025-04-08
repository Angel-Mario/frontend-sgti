<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps({
	usuario: {
		type: Object as () => Administrador,
		default: undefined,
	},
});

//Emiters definitions
defineEmits(["close"]);
const password = z
	.string({ message: "Requerido" })
	.min(8, "Al menos 8 characters")
	.regex(
		/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
		"Al menos un número, una letra mayúscula y una letra minúscula"
	);

const schema = z.object({
	nombre_u: z
		.string({ message: "Requerido" })
		.min(3, "Al menos 3 caracteres")
		.regex(/([a-z])/),
	nombre_apellidos: z
		.string({ message: "Requerido" })
		.min(8, "Al menos 8 caracteres"),
	correo: z.string({ message: "Requerido" }).email("No es un correo válido"),
	password: props.usuario ? password.optional() : password,
	telefono: z
		.string({ message: "Requerido" })
		.startsWith("53", { message: "Debe empezar con el código de país  53" })
		.length(11, {
			message: "Debe tener 11 digitos incluyendo el código de país",
		})
		.regex(/^53[0-9]+$/, { message: "Solo dígitos" })
		.optional(),
	rol: z.string({ message: "Requerido" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	nombre_u: props.usuario ? props.usuario.usuario : undefined,
	nombre_apellidos: props.usuario ? props.usuario.nombre : undefined,
	correo: props.usuario ? props.usuario.correo : undefined,
	password: undefined,
	telefono: props.usuario ? props.usuario.telefono : undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
	toast.add({
		title: "Success",
		description: "El administrador ha sido creado",
		color: "success",
	});
	console.log(event.data);
}
</script>

<template>
	<UForm
		:schema="schema"
		:state="state"
		class="grid grid-cols-9 space-y-4"
		:validate-on="[]"
		@submit="onSubmit"
	>
		<UFormField
			label="Nombre de usuario"
			name="nombre_u"
			required
			class="col-span-4"
		>
			<UInput v-model="state.nombre_u" placeholder="Ex: anibalpg" />
		</UFormField>

		<UFormField
			label="Contraseña"
			name="password"
			:required="!props.usuario"
			class="col-span-3 col-start-7"
		>
			<UInput
				v-model="state.password"
				type="password"
				:placeholder="props.usuario ? '••••••••••' : 'Ex: Ejemplo!*8'"
			/>
		</UFormField>

		<UFormField
			label=" Nombre y apellidos"
			name="nombre_apellidos"
			required
			class="col-span-5"
		>
			<UInput
				v-model="state.nombre_apellidos"
				placeholder="Ex: Anibal Perez Garcia"
			/>
		</UFormField>

		<UFormField label="Teléfono" name="telefono" class="col-span-3 col-start-7">
			<UInput v-model="state.telefono" placeholder="Ex: 5356463650" />
		</UFormField>
		<UFormField label="Correo" name="correo" required class="col-span-5">
			<UInput v-model="state.correo" placeholder="Ex: anibalpg@uci.cu" />
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
			<UButton label="Insertar" color="neutral" type="submit" />
		</div>
	</UForm>
</template>
