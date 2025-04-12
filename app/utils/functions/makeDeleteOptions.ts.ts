import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import type { FetchResponse } from "ofetch";

export const makeDeleteOptions = (
	successMessage: string,
	dataForm: unknown,
	refresh: () => void,
	toast: {
		toasts: globalThis.Ref<Toast[], Toast[]>;
		add: (toast: Partial<Toast>) => Toast;
		update: (id: string | number, toast: Omit<Partial<Toast>, "id">) => void;
		remove: (id: string | number) => void;
		clear: () => void;
	}
) => {
	return {
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: useRuntimeConfig().public.apiUrl, // Usa el valor de la variable pública
		body: JSON.stringify(dataForm),
		onResponse({ response }: { response: FetchResponse<unknown> }) {
			if (response.ok) {
				toast.add({
					title: "Operación realizada exitosamente",
					description: successMessage,
					color: "success",
				});
				refresh(); // Actualiza los datos de la tabla
			} else {
				toast.add({
					title: "Error al realizar la operación",
					description: "Bad Request",
					color: "error",
					icon: "i-lucide-alert-circle",
				});
			}
		},

		onRequestError({ error }: { error: Error }) {
			toast.add({
				title: "Error al enviar al hacer la petición",
				description: error.message,
				color: "error",
				icon: "i-lucide-alert-circle",
			});
		},
		onResponseError({ response }: { response: FetchResponse<unknown> }) {
			toast.add({
				title: "Error al recibir la respuesta",
				description: response.body?.getReader().read().toString(),
				color: "error",
				icon: "i-lucide-alert-circle",
			});
		},
	};
};
