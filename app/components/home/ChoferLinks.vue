<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <section class="w-full lg:w-2/3">
    <h2 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
      Accesos Rápidos
    </h2>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <HomeQuickLinkCard
        to="/vehicular/reportar-averia"
        title="Reportar avería"
        description="Reportar avería"
        compact
      >
        <UIcon name="i-lucide-badge-x" class="size-14" />
      </HomeQuickLinkCard>

      <HomeQuickLinkCard
        to="/personal/ruta-asignada"
        title="Ruta asignada"
        description="Ver la ruta asignadas"
        compact
      >
        <UIcon name="i-lucide-route" class="size-14" />
      </HomeQuickLinkCard>

      <HomeQuickLinkCard
        to="/vehicular/solicitar-pieza"
        title="Solicitar pieza"
        description="Solicitar pieza"
        compact
      >
        <UIcon name="i-lucide-cog" class="size-14" />
      </HomeQuickLinkCard>
    </div>
    <!-- sección para la información del vehículo asignado al chofer -->
    <div v-if="authStore.chofer && authStore.chofer.vehiculo" class="flex flex-col mt-3 w-fit">
      <h2 class="mt-3 mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Vehículo asignado
      </h2>
      <section class="grid w-full grid-cols-2 p-6 bg-white shadow-md gap-x-3 gap-y-1 dark:bg-navbardark-500 rounded-xl hover:shadow-lg">
        <p>Marca: {{ authStore.chofer.vehiculo.marca }}</p>
        <p>Modelo: {{ authStore.chofer.vehiculo.modelo }}</p>
        <p>Año: {{ authStore.chofer.vehiculo.año }}</p>
        <p>Matrícula: {{ authStore.chofer.vehiculo.matricula }}</p>
        <p>Modelo: {{ authStore.chofer.vehiculo.modelo }}</p>
        <p>Capacidad: {{ authStore.chofer.vehiculo.capacidad }}</p>
      </section>
    </div>
  </section>
</template>
