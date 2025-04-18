<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps({
	usuario: {
		type: Object as () => Usuario,
		default: undefined,
	},
	refresh: {
		type: Function,
		required: true,
	},
});
//Emiters definitions
const emit = defineEmits(["close"]);

const schema = UsuarioSchema(props.usuario ? true : false);

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	nombre_u: props.usuario ? props.usuario.nombre_u : undefined,
	fullName: props.usuario ? props.usuario.fullName : undefined,
	carnet: props.usuario ? props.usuario.carnet : undefined,
	correo: props.usuario ? props.usuario.correo : undefined,
	password: undefined,
	telefono:
		props.usuario && props.usuario.telefono === ""
			? props.usuario.telefono
			: undefined,
	rol: props.usuario
		? props.usuario.roles[0] === "admin"
			? "Administrador"
			: props.usuario.roles[0] === "chofer"
			? "Chofer"
			: "Suministrador"
		: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
	event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

	const dataForm = {
		...event.data,
		["rol"]: undefined,
		roles: [
			event.data.rol === "Administrador"
				? "admin"
				: event.data.rol === "Chofer"
				? "chofer"
				: "suministrador",
		],
	};
	console.log(dataForm, "DataForm");

	await $fetch(`personal/usuarios/${props.usuario ? props.usuario.id : ""}`, {
		...makePostPatchOptions(
			props.usuario
				? "Actualizado correctamente el usuario"
				: "Se ha registrado correctamente usuario",
			dataForm,
			() => {
				props.refresh(); // Actualiza los datos si es necesario
				emit("close", true);
			},
			toast
		),
		method: "POST",
	});
}
const items = ref(["Administrador", "Chofer", "Suministrador"]);

// Flag to track if the form has been modified
const isFormDirty = ref(false);

// Watch for changes in the form fields
watch(
	state,
	(newVal, oldVal) => {
		// Check if any of the form fields have changed
		isFormDirty.value = newVal === oldVal;
	},
	{ deep: true }
);
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
			label="Nombre y apellidos"
			name="fullName"
			required
			class="col-span-5"
		>
			<UInput v-model="state.fullName" placeholder="Ex: Anibal Perez Garcia" />
		</UFormField>

		<UFormField label="Teléfono" name="telefono" class="col-span-3 col-start-7">
			<UInput v-model="state.telefono" placeholder="Ex: 56463650" />
		</UFormField>
		<UFormField label="Correo" name="correo" required class="col-span-5">
			<UInput v-model="state.correo" placeholder="Ex: anibalpg@uci.cu" />
		</UFormField>
		<UFormField
			label="Carnet"
			name="carnet"
			required
			class="col-span-3 col-start-7"
		>
			<UInput v-model="state.carnet" placeholder="96124215561" />
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
				:label="usuario ? 'Actualizar' : 'Insertar'"
				color="neutral"
				type="submit"
				:disabled="!isFormDirty"
			/>
		</div>
	</UForm>
</template>
