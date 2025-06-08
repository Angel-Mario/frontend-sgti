export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (!isAuthenticated) {
    const accessToken = useCookie('access_token').value

    if (accessToken) {
      try {
        await authStore.fetchUser()
        return
      }
      catch {
        authStore.logout()
      }
    }

    return navigateTo(`/login?redirect=${to.path}`)
  }
  if (authStore.chofer && !authStore.chofer?.vehiculo) {
    const toast = useToast()

    toast.add({ title: 'Sin vehículo asignado', description: 'Acción no permitida', ui: {
      root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple',
      icon: 'text-purple-500',
      progress: 'bg-purple-500',
    }, icon: 'i-lucide-lock-keyhole' })

    return navigateTo(`/home?redirect=${to.path}`)
  }
})
