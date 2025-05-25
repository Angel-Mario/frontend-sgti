<script setup lang="ts">
import L from 'leaflet'

const props = defineProps({
  zoom: {
    type: Number,
    default: 14,
    required: false,
  },
  center: {
    type: Array<number>,
    default: () => [22.9919, -82.466039],
  },
  bounds: {
    type: Array<number[]>,
    default: [
      [22.9522, -82.5594],
      [23.1976, -82.2371],
    ],
    required: false,
  },
  locations: {
    type: Array<{ name: string, lat: number, lng: number }>,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
    required: false,
  },
  title: {
    type: String,
    default: 'Punto',
    required: false,
  },
})
const localOpen = ref(props.open)

// TODO: fix marker router to make an red icon
// When the map is ready
function onMapReady() {
  import('leaflet.markercluster')
}
const redIcon = L.icon({
  iconUrl: '../_nuxt/assets/img/marker-icon-red.png', // Archivo SVG con tu color
  shadowUrl: '../_nuxt/assets/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
</script>

<template>
  <UModal
    v-model:open="localOpen"
    :title="title"
    :ui="{
      content: 'sm:max-w-4xl w-11/12 xl:w-9/12 max-w-full',
      wrapper: 'sm:max-w-xl',
    }"
  >
    <template #body>
      <ClientOnly>
        <LMap
          style="height: 520px"
          :zoom="zoom"
          :bounds="bounds"
          :center="center as [number, number]"
          :use-global-leaflet="true"
          class="shadow-md rounded-xl"
          @ready="onMapReady"
        >
          <LTileLayer
            url="http://localhost:3003/api/tiles/{z}/{x}/{y}"
            layer-type="base"
            name="OpenStreetMap"
            :min-zoom="12"
            :max-zoom="18"
          />
          <template
            v-for="(location, index) in locations"
            :key="location.name"
          >
            <template v-if="index === 0">
              <LMarker :lat-lng="[location.lat, location.lng]">
                <LTooltip>
                  {{ locations.length > 1 ? 'Origen' : 'Nombre' }}: {{ location.name }}<br>
                  Ubicación: {{ location.lat }}, {{ location.lng }}
                </LTooltip>
              </LMarker>
            </template>
            <template v-else>
              <LMarker
                :lat-lng="[location.lat, location.lng]"
                :icon="redIcon"
              >
                <LTooltip>
                  Destino: {{ location.name }}<br>
                  Ubicación: {{ location.lat }}, {{ location.lng }}
                </LTooltip>
              </LMarker>
            </template>
          </template>
        </LMap>
      </ClientOnly>
    </template>
  </UModal>
</template>
