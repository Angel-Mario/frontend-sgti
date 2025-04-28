import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: (): AuthState => ({
		user: null,
		token: null,
	}),

	getters: {
		isAuthenticated: (state): boolean => !!state.user,
	},

	actions: {
		async login(response: { user: User } & AuthTokens): Promise<User> {
			this.user = response.user;
			this.token = response.token;
			useCookie("access_token").value = response.token;

			return response.user;
		},

		async fetchUser(): Promise<User> {
			const token = this.token || useCookie("access_token").value;
			if (!token) throw new Error("No access token available");

			const user = await $fetch<User>("/auth/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				baseURL: useRuntimeConfig().public.apiUrl,
			});
			this.user = user;
			return user;
		},

		async logout(): Promise<void> {
			this.$reset();
			useCookie("access_token").value = null;
		},

		async initialize(): Promise<void> {
			const token = useCookie("access_token").value;
			if (token && !this.user) {
				this.token = token;
				try {
					await this.fetchUser();
				} catch {
					this.logout();
				}
			}
		},
	},
});
