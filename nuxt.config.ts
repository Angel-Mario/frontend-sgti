// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 4,
	},
	modules: [
		"@nuxt/ui",
		"@nuxtjs/leaflet",
		"@nuxt/eslint",
		"@vueuse/nuxt",
		"@pinia/nuxt",
	],
	leaflet: {
		markerCluster: true,
	},
	css: ["./app/assets/css/main.css", "./app/assets/css/quickLinkCard.css"],
	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
	experimental: {
		buildCache: true,
		componentIslands: true,
	},
	plugins: ["./app/plugins/auth.init.ts"],
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
	routeRules: {
		"/login": { prerender: true },
		"/personal": { redirect: "/personal/usuarios" },
	},
});
