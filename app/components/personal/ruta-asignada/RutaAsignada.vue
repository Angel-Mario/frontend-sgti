<script lang="ts" setup>
const { chofer } = useAuthStore()
</script>

<template>
  <template v-if="chofer?.ruta">
    <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
      <h1 class="text-2xl font-bold">
        Ruta Asignada: {{ chofer.ruta.nombre }}
      </h1>
      <h2 class="mb-2 text-xl font-bold text-gray-300">
        [Punto de salida: {{ chofer.ruta.puntoSalida.nombre }}] [Punto de regreso: {{ chofer.ruta.puntoRegreso.nombre }}]
      </h2>
      <USeparator color="primary" type="solid" />
    </section>
    <main class="w-full px-3 py-5 m-auto overflow-hidden row-span-10 rounded-2xl">
      <ClientOnly>
        <GeograficoLeaflet :locations="[{ name: chofer.ruta.puntoSalida.nombre, lat: Number(chofer.ruta.puntoSalida.latLong.split(',')[0]), lng: Number(chofer.ruta.puntoSalida.latLong.split(',')[1]) }, { name: chofer.ruta.puntoRegreso.nombre, lat: Number(chofer.ruta.puntoRegreso.latLong.split(',')[0]), lng: Number(chofer.ruta.puntoRegreso.latLong.split(',')[1]) }]" :center="[Number(chofer.ruta.puntoSalida.latLong.split(',')[0]), Number(chofer.ruta.puntoSalida.latLong.split(',')[1])]" />
      </ClientOnly>
    </main>
  </template>
</template>
