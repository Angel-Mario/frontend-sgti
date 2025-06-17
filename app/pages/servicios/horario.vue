<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import TransporteHorario from '~/components/TransporteHorario.vue'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Editar Horario',
  pageDescription: 'Editar Horario',
  pageKeywords: 'servicios, servicio, editar, horario',
  name: 'edit-horario',
  middleware: ['admin'],
})

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    to: '/home',
  },
  {
    slot: 'dropdown' as const,
    icon: 'i-lucide-ellipsis',
    label: 'Personal',
    children: [
      {
        label: 'Horario',
        to: '/servicios/horario',
      },
      {
        label: 'Refuerzos',
        to: '/servicios/refuerzos',
      },
    ],
  },
  {
    label: 'Horario',
    to: '/servicios/horario',
  },
]

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
  {
    dia: 'Jueves',
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
    dia: 'Viernes',
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
    dia: 'Sabado',
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
    dia: 'Domingo',
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
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Horario
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="overflow-auto cool-scrollbar-dark w-full px-3 py-2  row-span-10 rounded-2xl">
        <TransporteHorario :dias="horarioSemanal" />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
