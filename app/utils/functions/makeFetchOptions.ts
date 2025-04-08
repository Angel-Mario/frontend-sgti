import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import type { FetchResponse } from "ofetch";
export const makeFetchOptions = (
	paramFilterSortPagination: Ref<ParamsPagination | ParamsFilter | Params>,
	toast: {
		toasts: globalThis.Ref<Toast[], Toast[]>;
		add: (toast: Partial<Toast>) => Toast;
		update: (id: string | number, toast: Omit<Partial<Toast>, "id">) => void;
		remove: (id: string | number) => void;
		clear: () => void;
	}
) => {
	return {
		query: paramFilterSortPagination,
		baseURL: "http://localhost:3000/api/",
		// baseURL: useRuntimeConfig().public.apiUrl,
		// onRequest({ request, options }) {
		// 	// options.headers.set("Authorization", "...");
		// },
		onRequestError({ error }: { error: Error }) {
			if (!error.message.startsWith("Request aborted"))
				toast.add({
					title: "Error al enviar al hacer la petición",
					description: error.message,
					color: "error",
					icon: "i-lucide-alert-circle",
				});
		},
		onResponseError({ response }: { response: FetchResponse<unknown> }) {
			console.log(response);
			toast.add({
				title: "Error al recibir la respuesta",
				description: response.body?.getReader().read().toString(),
				color: "error",
				icon: "i-lucide-alert-circle",
			});
		},
		lazy: true,
	};
};
