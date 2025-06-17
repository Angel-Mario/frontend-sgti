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

import { onClickOutside } from '@vueuse/core'

const notification = useTemplateRef('notification')

onClickOutside(notification, (event) => {
  if (notification?.value?.isDropdownOpen)
    notification?.value?.toggleDropdown()
})
</script>

<template>
  <main class="flex flex-col w-[99%] h-full">
    <header
      class="py-2 mb-4 text-gray-100 shadow dark:shadow-lg light:bg-gradient-to-t light:from-blue-50 light:to-slate-50 rounded-b-2xl dark:bg-navbardark-500"
    >
      <div class="flex items-center mx-auto ps-4">
        <UButton
          class="w-10 h-10 mx-1 -rotate-90 bg-transparent cursor-pointer dark:bg-navbardark-500"
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
        <UIcon
          name="i-custom-bus"
          class="duration-300 ease-in-out scale-100 cursor-pointer text-primary-500 size-12 hover:scale-105"
          @click="commonStore.openClose"
        />
        <h1
          class="flex items-center mt-1 ml-2 text-5xl font-bold text-center text-primary-500"
        >
          SGTI <span class="text-white light:bg-primary-400 rounded-md m-0.5 px-1 py-0.5 dark:text-white">UCI</span>
        </h1>
        <div class="flex flex-row items-center justify-center my-2 ms-auto gap-x-2 me-2">
          <Notificacions ref="notification" />
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
