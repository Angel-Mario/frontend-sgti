<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

definePageMeta({
  layout: 'authenticated',
  pageTitle: 'Choferes',
  pageDescription: 'Lista de choferes',
  pageKeywords: 'choferes, lista, choferes, admin',
  name: 'choferes',
  middleware: ['auth'],
})

useHead({
  title: 'Lista de Choferes',
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
        label: 'Usuarios',
        to: '/personal/usuarios',
      },
      {
        label: 'Administradores',
        to: '/personal/administradores',
      },
      {
        label: 'Choferes',
        to: '/personal/choferes',
      },
      {
        label: 'Suministradores',
        to: '/personal/suministradores',
      },
    ],
  },
  {
    label: 'Choferes',
    to: '/personal/choferes',
  },
]
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-(--ui-bg)">
    <RouteBreadCrumb :items="items">
      <section class="flex flex-col w-full row-span-1 px-6 rounded-2xl">
        <h1 class="text-2xl font-bold">
          Listado de Choferes
        </h1>
        <USeparator color="primary" type="solid" />
      </section>
      <main class="w-full px-3 overflow-hidden row-span-9 rounded-2xl">
        <PersonalChoferTable />
      </main>
    </RouteBreadCrumb>
  </div>
</template>
