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
})
