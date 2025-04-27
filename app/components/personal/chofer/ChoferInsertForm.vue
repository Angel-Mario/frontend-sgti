<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps({
	data: {
		type: Object as () => Administrador,
		default: undefined,
	},
	refresh: {
		type: Function,
		required: true,
	},
});

//Emiters definitions
const emit = defineEmits(["close"]);

// biome-ignore lint/complexity/noUselessTernary: <explanation>
const schema = AdministradorSchema(props.data ? true : false);

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	nombre_u: props.data ? props.data.nombre_u : undefined,
	fullName: props.data ? props.data.fullName : undefined,
	carnet: props.data ? props.data.carnet : undefined,
	correo: props.data ? props.data.correo : undefined,
	password: undefined,
	telefono:
		props.data && props.data.telefono === "" ? props.data.telefono : undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
	event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

	const dataForm = {
		...event.data,
	};
	console.log(dataForm, "DataForm");

	await $fetch(`personal/administradores/${props.data ? props.data.id : ""}`, {
		...makePostPatchOptions(
			props.data
				? "Actualizado correctamente el administrador"
				: "Se ha registrado correctamente administrador",
			dataForm,
			() => {
				props.refresh(); // Actualiza los datos si es necesario
				emit("close", true);
			},
			toast,
		),
		method: "POST",
	});
}
// Flag to track if the form has been modified
const isFormDirty = ref(false);

// Watch for changes in the form fields
watch(
	state,
	(newVal, oldVal) => {
		// Check if any of the form fields have changed
		isFormDirty.value = newVal === oldVal;
	},
	{ deep: true },
);
// this cheks for optional changes
whenever(
	() => state.telefono === "",
	() => {
		state.telefono = undefined;
	},
);
</script>

<template>
	<UForm
		:schema="schema"
		:state="state"
		class="grid grid-cols-9 space-y-4"
		@submit="onSubmit"
	>
		<UFormField
			label="Nombre de administrador"
			name="nombre_u"
			required
			class="col-span-4"
		>
			<UInput
				v-model="state.nombre_u"
				placeholder="Ex: anibalpg"
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
				:placeholder="props.data ? '••••••••••' : 'Ex: Ejemplo!*8'"
			/>
		</UFormField>

		<UFormField
			label="Nombre y apellidos"
			name="nombre_apellidos"
			required
			class="col-span-5"
		>
			<UInput
				v-model="state.fullName"
				placeholder="Ex: Anibal Perez Garcia"
			/>
		</UFormField>

		<UFormField
			label="Teléfono"
			name="telefono"
			class="col-span-3 col-start-7"
		>
			<UInput
				v-model="state.telefono"
				placeholder="Ex: 5356463650"
			/>
		</UFormField>
		<UFormField
			label="Correo"
			name="correo"
			required
			class="col-span-5"
		>
			<UInput
				v-model="state.correo"
				placeholder="Ex: anibalpg@uci.cu"
			/>
		</UFormField>
		<UFormField
			label="Carnet"
			name="carnet"
			required
			class="col-span-3 col-start-7"
		>
			<UInput
				v-model="state.carnet"
				placeholder="96124215561"
			/>
		</UFormField>

		<div class="border-t border-(--ui-border) pt-4 gap-x-3 flex justify-end col-span-full">
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
