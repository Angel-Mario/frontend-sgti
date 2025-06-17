export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'blue', // amber
      neutral: 'stone',
    },
    input: {
      slots: {
        root: 'w-full',
      },
    },
    formField: {
      slots: {
        root: 'w-full',
        wrapper: 'w-full',
      },
    },
  },
})
