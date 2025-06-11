<script setup lang="ts">
defineProps<{
  dias: {
    dia: string
    eventos: {
      tipo: string
      hora: string
      descripcion: string
      momento: string
    }[]
  }[]
}>()

// tipo: 'pioneros' | 'alimentos' | 'profesores' | 'trabajadores'
// momento: 'matutino' | 'tarde' | 'noche'
function getTipoColor(tipo: string) {
  switch (tipo) {
    case 'pioneros':
      return 'primary'
    case 'alimentos':
      return 'info'
    case 'profesores':
      return 'neutral'
    case 'trabajadores':
      return 'neutral'
    default:
      return 'info'
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <UCard
      v-for="(dia, index) in dias"
      :key="index"
      class="bg-white shadow-lg "
    >
      <template #header>
        <h2 class="text-xl font-bold text-center">
          {{ dia.dia }}
        </h2>
      </template>

      <div class="space-y-4">
        <span class="text-xl font-semibold text-gray-800">
          Mañana
        </span>
        <div
          v-for="(evento, i) in dia.eventos"
          :key="i"
          class="flex flex-col gap-1 p-2 border-l-4"
          :class="{
            'border-blue-500': evento.momento === 'matutino',
            'border-yellow-500': evento.momento === 'tarde',
            'border-purple-500': evento.momento === 'noche',
          }"
        >
          <div class="flex items-center justify-between">
            <span class="font-semibold text-gray-800">
              {{ evento.hora }}
            </span>
            <UBadge :color="getTipoColor(evento.tipo)">
              {{ evento.tipo }}
            </UBadge>
          </div>
          <p class="text-sm text-gray-600">
            {{ evento.descripcion }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
</style>
