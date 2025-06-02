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

function onMapReady() {
  import('leaflet.markercluster')
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
</script>

<template>
  <ClientOnly>
    <LMap
      :style="`height: ${props.size}`"
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
