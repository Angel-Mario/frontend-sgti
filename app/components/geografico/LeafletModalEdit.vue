<script setup lang="ts">
import type { Map } from 'leaflet'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import L from 'leaflet'

const props = defineProps({
  zoom: {
    type: Number,
    default: 14,
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
  },
  locations: {
    type: Array<{ name?: string, lat: number, lng: number }>,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Punto',
  },
  sendData: {
    type: Function,
    required: true,
  },
})
const localOpen = ref(props.open)
const localTitle = ref(props.title)

const map = useTemplateRef('map')
const locationsMap = props.locations.map((location) => {
  return {
    name: location.name,
    lat: location.lat,
    lng: location.lng,
    options: {
      draggable: true,
    },
  }
})

// When the map is ready
async function onMapReady() {
  // Added this
  import('leaflet.markercluster')
  const { markers } = await useLMarkerCluster({
    leafletObject: map.value?.leafletObject as Map,
    markers: locationsMap,
  })
  for (const marker of markers) {
    marker.bindTooltip(
      L.tooltip().setContent(
        `</h1>Nombre: ${marker.options.title}<br>Ubicación: ${marker.getLatLng().lat}, ${marker.getLatLng().lng}</h1>`,
      ),
    )
    marker.addEventListener('moveend', () => {
      marker.bindTooltip(
        L.tooltip().setContent(
          `</h1>Nombre: ${marker.options.title}<br>Ubicación: ${marker.getLatLng().lat}, ${marker.getLatLng().lng}</h1>`,
        ),
      )

      localTitle.value = `Nueva posición del punto de referencia [${marker.getLatLng().lat}, ${marker.getLatLng().lng}]`

      props.sendData({
        latLong: `${marker.getLatLng().lat}, ${marker.getLatLng().lng}`,
      }) // Resolve the promise with data
    })
  }
  // Capture coordinates on click
  map.value?.leafletObject?.on('click', (e) => {
    const lat = e.latlng.lat
    const lng = e.latlng.lng
    let marker = markers[0]
    if (marker) {
      marker.setLatLng(e.latlng)
    }
    else {
      marker = L.marker(e.latlng).addTo(map.value?.leafletObject as Map)
      markers.push(marker)
    }
    marker.bindTooltip(
      L.tooltip().setContent(
        `</h1>Nombre: ${marker.options.title}<br>Ubicación: ${marker.getLatLng().lat}, ${marker.getLatLng().lng}</h1>`,
      ),
    )

    localTitle.value = `Nueva posición del punto de referencia [${marker.getLatLng().lat}, ${marker.getLatLng().lng}]`

    localTitle.value = `Nueva posición del punto de referencia [${lat}, ${lng}]`
    props.sendData({ latLong: `${lat}, ${lng}` }) // Resolve the promise with data
  })
}
</script>

<template>
  <UModal
    v-model:open="localOpen"
    :title="localTitle"
    :ui="{
      content: 'sm:max-w-4xl w-11/12 xl:w-9/12 max-w-full',
      wrapper: 'sm:max-w-xl',
    }"
  >
    <template #body>
      <ClientOnly>
        <LMap
          ref="map"
          style="height: 520px"
          :zoom="zoom"
          :center="center as [number, number]"
          :use-global-leaflet="true"
          :bounds="bounds"
          class="shadow-md rounded-xl"
          @ready="onMapReady"
        >
          <LTileLayer
            :url="useRuntimeConfig().public.mapProvider"
            layer-type="base"
            name="OpenStreetMap"
            :min-zoom="12"
            :max-zoom="18"
          />
        </LMap>
      </ClientOnly>
    </template>
  </UModal>
</template>
