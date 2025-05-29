import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    chofer: null,
    token: null,
    apiUrl: useRuntimeConfig().public.apiUrl, // Added to store runtime config
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    getToken: (state): string => state.token || '',
  },

  actions: {
    async login(response: { user: User } & AuthTokens): Promise<User> {
      this.user = response.user
      this.token = response.token // Plugin's watcher will update the cookie
      return response.user
    },

    async fetchUser(): Promise<User> {
      if (!this.token)
        throw new Error('No access token available')

      const user = await $fetch<User>('/auth/me', {
        headers: { Authorization: `Bearer ${this.token}` },
        baseURL: this.apiUrl,
      })
      this.user = user
      if (user.roles.includes('chofer'))
        await this.fetchChofer()
      return user
    },

    async fetchChofer(): Promise<AuthChofer> {
      if (!this.token)
        throw new Error('No access token available')

      const chofer = await $fetch<AuthChofer>('/personal/choferes/me', {
        headers: { Authorization: `Bearer ${this.token}` },
        baseURL: this.apiUrl,
      })
      this.chofer = chofer
      return chofer
    },

    logout(): void {
      this.$reset()
      this.token = null // Plugin's watcher will clear the cookie
    },

    async initialize(): Promise<void> {
      if (this.token) {
        await this.fetchUser()
        if (this.user?.roles?.includes('chofer')) {
          await this.fetchChofer()
        }
      }
    },
  },
})
