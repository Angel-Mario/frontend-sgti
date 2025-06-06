import type { Toast } from '@nuxt/ui/runtime/composables/useToast.js'
import type { FetchResponse, ResolvedFetchOptions } from 'ofetch'

export function makePostPatchOptions(successMessage: string, dataForm: unknown, closeTrigger: () => void, toast: {
  toasts: globalThis.Ref<Toast[], Toast[]>
  add: (toast: Partial<Toast>) => Toast
  update: (id: string | number, toast: Omit<Partial<Toast>, 'id'>) => void
  remove: (id: string | number) => void
  clear: () => void
}, token: string) {
  return {
    baseURL: useRuntimeConfig().public.apiUrl, // Usa el valor de la variable pública
    body: JSON.stringify(dataForm),
    onRequest({ options }: { options: ResolvedFetchOptions }) {
      options.headers.set('Authorization', token)
    },
    onResponse({ response }: { response: FetchResponse<unknown> }) {
      if (response.ok) {
        toast.add({
          title: 'Operación realizada exitosamente',
          description: successMessage,
          color: 'success',
        })
        closeTrigger() // Cierra el modal
      }
    },

    onRequestError({ error }: { error: Error }) {
      toast.add({
        title: 'Error al enviar al hacer la petición',
        description: error.message,
        color: 'error',
        icon: 'i-lucide-alert-circle',
      })
    },
    onResponseError({ response }: { response: FetchResponse<unknown> }) {
      toast.add({
        title: 'Error al recibir la respuesta',
        description: response.body?.getReader().read().toString(),
        color: 'error',
        icon: 'i-lucide-alert-circle',
      })
    },
    lazy: true,
  }
}
