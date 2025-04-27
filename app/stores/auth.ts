import { defineStore } from "pinia";
import type { AuthState, LoginCredentials, User } from "~/utils/types/auth";

export const useAuthStore = defineStore("auth", {
	state: (): AuthState => ({
		user: null,
		accessToken: null,
		refreshToken: null,
		isLoading: false,
	}),

	getters: {
		isAuthenticated: (state): boolean => !!state.user,
	},

	actions: {
		async login(credentials: LoginCredentials): Promise<User> {
			this.isLoading = true;
			try {
				const response = await $fetch<{ user: User } & AuthTokens>(
					"/api/auth/login",
					{
						method: "POST",
						body: credentials,
					},
				);

				this.user = response.user;
				this.accessToken = response.accessToken;
				this.refreshToken = response.refreshToken;

				useCookie("access_token").value = response.accessToken;
				useCookie("refresh_token").value = response.refreshToken;

				return response.user;
			} finally {
				this.isLoading = false;
			}
		},

		async refreshToken(): Promise<string> {
			try {
				const refreshToken =
					this.refreshToken || useCookie("refresh_token").value;
				if (!refreshToken) throw new Error("No refresh token available");

				const response = await $fetch<AuthTokens>("/api/auth/refresh", {
					method: "POST",
					body: { refreshToken },
				});

				this.accessToken = response.accessToken;
				this.refreshToken = response.refreshToken;

				useCookie("access_token").value = response.accessToken;
				useCookie("refresh_token").value = response.refreshToken;

				return response.accessToken;
			} catch (error) {
				this.logout();
				throw error;
			}
		},

		async fetchUser(): Promise<User> {
			const accessToken = this.accessToken || useCookie("access_token").value;
			if (!accessToken) throw new Error("No access token available");

			const user = await $fetch<User>("/api/auth/me", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			this.user = user;
			return user;
		},

		async logout(): Promise<void> {
			try {
				const refreshToken =
					this.refreshToken || useCookie("refresh_token").value;
				if (refreshToken) {
					await $fetch("/api/auth/logout", {
						method: "POST",
						body: { refreshToken },
					});
				}
			} finally {
				this.$reset();
				useCookie("access_token").value = null;
				useCookie("refresh_token").value = null;
			}
		},

		async initialize(): Promise<void> {
			const accessToken = useCookie("access_token").value;
			if (accessToken && !this.user) {
				this.accessToken = accessToken;
				try {
					await this.fetchUser();
				} catch (error) {
					try {
						await this.refreshToken();
						await this.fetchUser();
					} catch (refreshError) {
						this.logout();
					}
				}
			}
		},
	},
});
