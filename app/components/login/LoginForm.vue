<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
const schema = z.object({
	user: z.string({ message: "Requerido" }),
	password: z.string({ message: "Requerido" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	user: undefined,
	password: undefined,
});
const router = useRouter();
// const toast = useToast();

// function showToast(titutlo: string, description: string) {
// 	toast.add({ title: titutlo, description: description });
// }

async function onSubmit(event: FormSubmitEvent<Schema>) {
	console.log(event.data);
	localStorage.setItem("token", event.data.user);
	router.push("/home");

	// const { data } = await useFetch<{ token: string  }|{error: boolean, statuscode: number, message: string}>(
	// 	"/api/auth/login",
	// 	{
	// 		method: "POST",
	// 		body: event.data,
	// 		baseURL: "http://localhost:3000/api/",
	// 		// baseURL: useRuntimeConfig().public.apiUrl,
	// 		onResponse: (response) => {
	// 			if (response.error) {
	// 				showToast(response.data.statuscode, response.data.message);
	// 			}
	// 			if (response.data.token) {
	// 				localStorage.setItem("token", response.data.token);
	// 				router.push("/personal/usuarios");
	// 			}
	// 		},
	// 	}
	// );
}
</script>

<template>
	<!-- Formulario de inicio de sesión -->
	<UForm :schema="schema" :state="state" class="space-y-2" @submit="onSubmit">
		<UFormField name="user" class="h-20 mt-4">
			<UInput
				v-model="state.user"
				trailing-icon="lucide-user"
				placeholder=""
				size="xl"
				:ui="{ base: 'peer bg-navbardark-500' }"
			>
				<label class="label-floating">
					<span class="inline-flex px-1 bg-navbardark-500"
						>Nombre de usuario</span
					>
				</label>
			</UInput>
		</UFormField>
		<!-- Password Field -->
		<UFormField name="password" class="h-20">
			<UInput
				v-model="state.password"
				trailing-icon="lucide-key-round"
				type="password"
				placeholder=""
				size="xl"
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
