<script lang="ts" setup>
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
  size: {
    type: String,
    default: '520px',
  },
})
const map = useTemplateRef('map')

function onMapReady() {
  import('leaflet.markercluster')
  if (props.locations.length > 1) {
    import('leaflet-routing-machine')

    const control = L.Routing.control({
      routeWhileDragging: true,
      plan: new L.Routing.Plan([
        L.latLng(props.locations[0]!.lat, props.locations[0]!.lng),
        L.latLng(props.locations[1]!.lat, props.locations[1]!.lng),
      ], {
        language: 'es',
      }),
      // @ts-expect-error libreria types.d.ts wrong
      language: 'es',
    })
    control.addTo(map.value?.leafletObject as L.Map)
  }
}
let redIcon: L.Icon<L.IconOptions>
if (props.locations.length > 1) {
  redIcon = L.icon({
    iconUrl: '/markers/marker-icon-red.png', // Archivo SVG con tu color
    shadowUrl: '/markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })
}

// Create Routing Control
// const control = L.Routing.control({
//   waypoints: [
//     L.latLng(51.5, -0.09),
//     L.latLng(51.51, -0.1),
//   ],
//   routeWhileDragging: true,
// }).addTo(map)
</script>

<template>
  <ClientOnly>
    <LMap
      ref="map"
      :style="`height: ${props.size}`"
      :zoom="zoom"
      :bounds="bounds"
      :center="center as [number, number]"
      :use-global-leaflet="true"
      class="text-black shadow-md rounded-xl"
      @ready="onMapReady"
    >
      <LTileLayer
        :url="useRuntimeConfig().public.mapProvider"
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

<style scoped>
.light {
  /* Force light mode in child components */
  color-scheme: light !important;
}

.light :deep(*) {
  color-scheme: light !important;
  /* Add other necessary resets */
}
</style>
