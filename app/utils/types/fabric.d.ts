import type { fabric } from 'fabric'

export default {}

declare module '#app' {
  interface NuxtApp {
    $fabric: typeof fabric
  }
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp {
    $fabric: typeof fabric
  }
}
