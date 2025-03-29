<template>
  <div class="grid w-full m-3 grid-rows-10 bg-neutral-850 gap-y-3">
    <section class="flex flex-col w-full row-span-1 px-6 py-3 rounded-2xl">
      <h1 class="text-2xl font-bold">Listado de usuarios</h1>
      <USeparator color="primary" type="solid" />
    </section>
    <main class="w-full px-3 row-span-9 rounded-2xl">
      <PersonalUsuariosTable />
    </main>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  pageTitle: 'Usuarios',
  pageDescription: 'Lista de usuarios',
  pageIcon: 'i-lucide-user',
  pageKeywords: 'usuarios, lista, usuario, admin',
  name: 'usuarios',
})

</script>