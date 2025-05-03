import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
import type { FetchResponse, ResolvedFetchOptions } from "ofetch";

export const makeFetchOptions = (
	paramFilterSortPagination: Ref<
		ParamsPagination | ParamsFilter | Params | string
	>,

	toast: {
		toasts: globalThis.Ref<Toast[], Toast[]>;
		add: (toast: Partial<Toast>) => Toast;
		update: (id: string | number, toast: Omit<Partial<Toast>, "id">) => void;
		remove: (id: string | number) => void;
		clear: () => void;
	},
	token: string,
) => {
	return {
		query: paramFilterSortPagination,
		// baseURL: "http://localhost:3000/api/",
		baseURL: useRuntimeConfig().public.apiUrl,

		onRequest({ options }: { options: ResolvedFetchOptions }) {
			options.headers.set("Authorization", token);
		},
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
			toast.add({
				title: "Error al recibir la respuesta",
				description: response.body?.getReader().read().toString(),
				color: "error",
				icon: "i-lucide-alert-circle",
			});
		},
		onResponse({ response }: { response: FetchResponse<unknown> }) {
			if (response.status === 403) {
				toast.add({
					title: "Error de permiso",
					description: "Acción no permitida",
					ui: {
						root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple",
						icon: "text-purple-500",
						progress: "bg-purple-500",
					},
					icon: "i-lucide-lock-keyhole",
				});
			}
		},
		lazy: true,
	};
};
