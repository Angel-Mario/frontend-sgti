<script lang="ts" setup>
const a = useMediaQuery('(width >= 64rem)')

// const { user } = useAuthStore();
</script>

<template>
  <main class="flex flex-col w-[99%] h-full">
    <header
      class="py-2 mb-4 text-gray-100 shadow-lg bg-gradient-to-r from-navbardark-500 to-navbardark-500 rounded-b-2xl"
    >
      <div class="flex mx-auto ps-16">
        <h1
          class="flex items-center mt-1 text-5xl font-bold text-center text-primary-500"
        >
          SGTI <span class="dark:text-white">UCI</span>
        </h1>
        <div class="w-72 ms-auto">
          <CurrentUser />
        </div>
      </div>
    </header>

    <div class="container px-4 mx-auto xl:px-10">
      <div class="flex flex-col gap-8 lg:flex-row">
        <!-- Sección de perfil -->
        <HomeProfile>
          <HomeFooter v-if="a" />
        </HomeProfile>

        <!-- Sección de enlaces -->
        <HomeAdminLinks />
        <HomeFooter v-if="!a" />
      </div>
    </div>
  </main>
</template>
