<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
	nombre_u: z
		.string({ message: "Requerido" })
		.regex(/^[a-z]+$/, "Solo letras minúsculas"),
	password: z.string({ message: "Requerido" }),
});

type Schema = z.output<typeof schema>;

const state = ref<Partial<Schema>>({
	nombre_u: undefined,
	password: undefined,
});
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();


const onSubmit = async (event: FormSubmitEvent<Schema>) => {

	try {
		const data = await $fetch<{ user: User } & AuthTokens | ErrorResponse>("/auth/login", {
			method: "POST",
			body: event.data,
			baseURL: useRuntimeConfig().public.apiUrl,
			onResponse: ({ response }) => {
				if (response._data.error) {
					throw new Error(response._data.message);
				}
			},
		})

		if ('error' in data && data.error) {
			toast.add({ title: "Error de autenticación", description: data.message });
			return;
		}

		if ('token' in data) {
			authStore.login(data);
			router.push("/home");
		}
	} catch (error) {
		if (error instanceof Error) {
			toast.add({ title: "Error", description: error.message });
		}
	}
}

whenever(
	() => state.value.nombre_u === "",
	() => {
		state.value.nombre_u = undefined;
	},
);
</script>

<template>
	<!-- Formulario de inicio de sesión -->
	<UForm
		:schema="schema"
		:state="state"
		class="space-y-2"
		@submit="onSubmit"
	>
		<UFormField
			name="nombre_u"
			class="h-20 mt-4"
		>
			<UInput
				v-model="state.nombre_u"
				trailing-icon="lucide-user"
				placeholder=""
				:autocomplete="'username'"
				size="xl"
				:ui="{ base: 'peer bg-navbardark-500' }"
			>
				<label class="label-floating">
					<span class="inline-flex px-1 bg-navbardark-500">Nombre de usuario</span>
				</label>
			</UInput>
		</UFormField>
		<!-- Password Field -->
		<UFormField
			name="password"
			class="h-20"
		>
			<UInput
				v-model="state.password"
				trailing-icon="lucide-key-round"
				type="password"
				placeholder=""
				size="xl"
				:autocomplete="'current-password'"
				:ui="{ base: 'peer bg-navbardark-500' }"
			>
				<label class="label-floating">
					<span class="inline-flex px-1 bg-navbardark-500">Contraseña</span>
				</label>
			</UInput>
		</UFormField>

		<!-- Submit Button -->
		<UButton
			type="submit"
			size="lg"
			variant="solid"
			class="justify-center w-full font-bold rounded-2xl bg-primary-500 hover:bg-primary-600"
		>
			Iniciar Sesión
		</UButton>
	</UForm>
</template>
