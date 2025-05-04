<template>
	<div>
		<h1>Nuxt Leaflet Map</h1>
		<ClientOnly>
			<LMap
				style="height:800px"
				:zoom="14"
				:center="[22.991900, -82.466039]"
				:use-global-leaflet="false"
				:bounds="[[22.9522, -82.5594], [23.1976, -82.2371]]"
			>
				<LTileLayer
					url="http://localhost:3003/api/tiles/{z}/{x}/{y}"
					attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
					layer-type="base"
					name="OpenStreetMap"
					:min-zoom="12"
					:max-zoom="18"
				/>
			</LMap>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import { onMounted } from 'vue'

onMounted(() => {
	console.log(L)
})
</script>