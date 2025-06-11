<script setup lang="ts">
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
  // Repite para otros días...
]
</script>

<template>
  <TransporteHorario :dias="horarioSemanal" />
</template>
