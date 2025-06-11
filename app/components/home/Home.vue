<script lang="ts" setup>
const a = useMediaQuery('(width >= 64rem)')

const auth = useAuthStore()
const user = auth.user
onMounted(
  () => {
    auth.initialize()
  },
)
const commonStore = useCommonStore()
</script>

<template>
  <main class="flex flex-col w-[99%] h-full">
    <header
      class="py-2 mb-4 text-gray-100 shadow-lg bg-gradient-to-r from-navbardark-500 to-navbardark-500 rounded-b-2xl"
    >
      <div class="flex items-center mx-auto ps-4">
        <UButton
          class="w-10 h-10 -rotate-90 cursor-pointer bg-(--ui-bg) dark:bg-navbardark-500"
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-align-justify"
          :ui="{
            trailingIcon: commonStore.isOpen ? 'rotate-0 m-auto transition-transform duration-200' : 'rotate-90 m-auto transition-transform duration-200',
          }"
          block
          size="xl"
          @click="commonStore.openClose"
        />
        <h1
          class="flex items-center mt-1 ml-2 text-5xl font-bold text-center text-primary-500"
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
        <HomeProfile />

        <!-- Sección de enlaces -->
        <LazyHomeAdminLinks v-if="user?.roles.includes('admin')" v-once />
        <LazyHomeChoferLinks v-if="user?.roles.includes('chofer')" />
        <LazyHomeSuministradorLinks v-if="user?.roles.includes('suministrador')" v-once />
        <HomeFooter v-if="!a" />
      </div>
    </div>
    <HomeFooter v-if="a" />
  </main>
</template>
