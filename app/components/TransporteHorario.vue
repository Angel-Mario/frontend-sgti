<script setup lang="ts">
const props = defineProps<{
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

// Mapear momento → título visible
const momentoLabels: Record<string, string> = {
  matutino: 'Mañana',
  tarde: 'Tarde',
  noche: 'Noche',
}

// Función de colores
function getTipoColor(tipo: string) {
  switch (tipo) {
    case 'pioneros':
      return 'info'
    case 'alimentos':
      return 'success'
    case 'profesores':
    case 'trabajadores':
      return 'neutral'
    default:
      return 'info'
  }
}

// Agrupa eventos por momento
function agruparPorMomento(eventos: typeof props.dias[0]['eventos']) {
  return eventos.reduce((acc: Record<string, typeof eventos>, evento) => {
    if (!acc[evento.momento])
      acc[evento.momento] = []
    if (acc && acc[evento.momento])
      acc[evento?.momento]?.push(evento)
    return acc
  }, {})
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <UCard
      v-for="(dia, index) in dias"
      :key="index"
      class="light:bg-white dark:bg-navbardark-500 shadow-lg transition-colors duration-300"
    >
      <template #header>
        <h2 class="text-xl font-bold text-center text-gray-900 dark:text-white">
          {{ dia.dia }}
        </h2>
      </template>

      <div class="space-y-4">
        <template v-for="(eventos, momento) in agruparPorMomento(dia.eventos)" :key="momento">
          <span class="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
            {{ momentoLabels[momento] || momento }}
          </span>

          <div
            v-for="(evento, i) in eventos"
            :key="i"
            class="flex flex-col gap-1 px-2 py-3 border-l-4 rounded-md light:bg-gray-50 dark:bg-navbardark-300 transition-colors"
            :class="{
              'border-blue-500': evento.momento === 'matutino',
              'border-yellow-500': evento.momento === 'tarde',
              'border-purple-500': evento.momento === 'noche',
            }"
          >
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ evento.hora }}
              </span>
              <UBadge :color="getTipoColor(evento.tipo)">
                {{ evento.tipo }}
              </UBadge>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{ evento.descripcion }}
            </p>
          </div>
        </template>
      </div>
    </UCard>
  </div>
</template>
