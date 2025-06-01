<script setup lang="ts">
</script>

<template>
  <section class="w-full lg:w-2/3">
    <h2 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
      Accesos Rápidos
    </h2>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <HomeQuickLinkCard
        to=""
        title="Asignar Combustible"
        description="Asignar combustible por fecha "
        compact
      >
        <UIcon name="i-lucide-chart-candlestick" class="size-14" />
      </HomeQuickLinkCard>

      <HomeQuickLinkCard
        to="/geografico/puntos-combustible"
        title="Puntos de combustible"
        description="Puntos de combustible"
        compact
      >
        <UIcon name="i-lucide-fuel" class="size-14" />
      </HomeQuickLinkCard>

      <HomeQuickLinkCard
        to=""
        title="Solicitar refuerzo"
        description="Solicitar refuerzo"
        compact
      >
        <UIcon name="i-lucide-mail-question" class="size-14" />
      </HomeQuickLinkCard>
    </div>
  </section>
</template>
