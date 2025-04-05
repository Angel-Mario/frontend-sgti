// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 4,
	},
	modules: ["@nuxt/ui", "@nuxt/eslint", "@vueuse/nuxt"],
	css: ["./app/assets/css/main.css"],

	icon: {
		customCollections: [
			{
				prefix: "custom",
				dir: "./app/assets/icons",
			},
		],
	},
	runtimeConfig: {
		public: {
			apiUrl: process.env.VUE_APP_API_URL,
			defaultPageSize: process.env.VUE_APP_DEFAULT_PAGE_SIZE,
		},
	},
	// nitro: {
	// 	prerender: {
	// 		routes: ["/personal/usuarios"],
	// 		// ignore: ["/dynamic"],
	// 	},
	// },
});
