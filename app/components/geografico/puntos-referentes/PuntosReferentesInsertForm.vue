<script setup lang="ts">
import type * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { PuntoRefSchema } from "~/utils/validations/geografico/PuntoRefSchema";

const props = defineProps({
	data: {
		type: Object as () => PuntoRef,
		default: undefined,
	},
	refresh: {
		type: Function,
		required: true,
	},
});
//Emiters definitions
const emit = defineEmits(["close"]);

const schema = PuntoRefSchema()

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	nombre: props.data ? props.data.nombre : undefined,
	latLong: props.data ? props.data.latLong : undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
	event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

	const dataForm = {
		...event.data,
	};
	console.log(dataForm, "DataForm");

	await $fetch(`geografico/puntos-ref/${props.data ? props.data.id : ""}`, {
		...makePostPatchOptions(
			props.data
				? "Actualizado correctamente el punto de referencia"
				: "Se ha registrado correctamente el punto de referencia",
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
			class="col-span-5"
			label="Nombre del punto"
			name="nombre"
			required
		>
			<UInput
				v-model="state.nombre"
				placeholder="Ex: Parque de La leche"
			/>
		</UFormField>


		<UFormField
			label="Latitud y Longitud"
			name="latLong"
			required
			class="col-span-3 col-start-7"
		>
			<UInput
				v-model="state.latLong"
				placeholder="Ex: 19.4376, -98.5076"
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
