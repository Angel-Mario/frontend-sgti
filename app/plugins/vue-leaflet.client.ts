import { defineNuxtPlugin } from '#app'
import * as components from '@vue-leaflet/vue-leaflet'

export default defineNuxtPlugin((nuxtApp) => {
  // Registrar componentes solo en el cliente
  nuxtApp.vueApp.component('LMap', components.LMap)
  nuxtApp.vueApp.component('LTileLayer', components.LTileLayer)
  nuxtApp.vueApp.component('LMarker', components.LMarker)
  nuxtApp.vueApp.component('LIcon', components.LIcon)
  nuxtApp.vueApp.component('LControlLayers', components.LControlLayers)
  nuxtApp.vueApp.component('LTooltip', components.LTooltip)
  nuxtApp.vueApp.component('LPopup', components.LPopup)
  nuxtApp.vueApp.component('LPolyline', components.LPolyline)
  nuxtApp.vueApp.component('LPolygon', components.LPolygon)
  nuxtApp.vueApp.component('LRectangle', components.LRectangle)
})
