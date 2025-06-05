// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/leaflet',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['./app/assets/css/main.css', './app/assets/css/quickLinkCard.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.VUE_APP_API_URL,
      defaultPageSize: process.env.VUE_APP_DEFAULT_PAGE_SIZE,
      mapProvider: process.env.VUE_APP_MAP_PROVIDER,
    },
  },

  routeRules: {
    // '/login': { prerender: true ,},
    '/personal': { redirect: '/personal/usuarios' },
  },

  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    // buildCache: true,
    // componentIslands: true,
    // cookieStore: true,
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true, // <---
      standalone: false, // <---
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
  },

  leaflet: {
    markerCluster: true,
  },
})
