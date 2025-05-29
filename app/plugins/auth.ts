export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const apiUrl = useRuntimeConfig().public.apiUrl

  // Set API URL in the store
  authStore.apiUrl = apiUrl

  // Initialize token from cookie
  const token = useCookie('access_token').value
  if (token) {
    authStore.token = token
  }

  // Sync token changes to cookie
  watch(() => authStore.token, (newToken) => {
    useCookie('access_token').value = newToken
  })

  // Initialize auth state if authenticated
  if (authStore.token && !authStore.user) {
    try {
      await authStore.initialize()
    }
    catch {
      authStore.logout()
    }
  }
})
