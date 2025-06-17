<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})
import TransporteHorario from '~/components/TransporteHorario.vue'

const horarioSemanal = [
  {
    dia: 'Lunes',
    eventos: [
      {
        tipo: 'alimentos',
        hora: '05:30',
        descripcion: 'Llegada de vehículos de alimentos',
        momento: 'matutino',
      },
      {
        tipo: 'pioneros',
        hora: '07:00',
        descripcion: 'Salida de pioneros hacia refuerzo de terminales',
        momento: 'matutino',
      },
      {
        tipo: 'trabajadores',
        hora: '17:00',
        descripcion: 'Transporte masivo de trabajadores',
        momento: 'tarde',
      },
      {
        tipo: 'alimentos',
        hora: '21:00',
        descripcion: 'Salida del personal de alimentos',
        momento: 'noche',
      },
    ],
  },
  {
    dia: 'Martes',
    eventos: [
      {
        tipo: 'alimentos',
        hora: '05:30',
        descripcion: 'Llegada de vehículos de alimentos',
        momento: 'matutino',
      },
      {
        tipo: 'pioneros',
        hora: '07:00',
        descripcion: 'Salida de pioneros hacia refuerzo de terminales',
        momento: 'matutino',
      },
      {
        tipo: 'trabajadores',
        hora: '17:00',
        descripcion: 'Transporte masivo de trabajadores',
        momento: 'tarde',
      },
      {
        tipo: 'alimentos',
        hora: '21:00',
        descripcion: 'Salida del personal de alimentos',
        momento: 'noche',
      },
    ],
  },
  {
    dia: 'Miércoles',
    eventos: [
      {
        tipo: 'alimentos',
        hora: '05:30',
        descripcion: 'Llegada de vehículos de alimentos',
        momento: 'matutino',
      },
      {
        tipo: 'pioneros',
        hora: '07:00',
        descripcion: 'Salida de pioneros hacia refuerzo de terminales',
        momento: 'matutino',
      },
      {
        tipo: 'trabajadores',
        hora: '17:00',
        descripcion: 'Transporte masivo de trabajadores',
        momento: 'tarde',
      },
      {
        tipo: 'alimentos',
        hora: '21:00',
        descripcion: 'Salida del personal de alimentos',
        momento: 'noche',
      },
    ],
  },
  // Repite para otros días...
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg) justify-center items-center px-8 sm:px-10">
    <h1 class="text-2xl font-semibold">
      Horario
    </h1>
    <main class="overflow-auto cool-scrollbar-dark w-full">
      <TransporteHorario :dias="horarioSemanal" />
    </main>
  </div>
</template>
