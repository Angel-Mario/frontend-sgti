<script lang="ts" setup>
import { useTemplateRef } from 'vue'

const user = useAuthStore().user
const isAuthenticated = useAuthStore().isAuthenticated

const fps = useFps()

const open = ref(false)
const commonStore = useCommonStore()

watch(commonStore, () => {
  open.value = commonStore.isOpen
})

function toggleSidebar() {
  // open.value = !open.value
  commonStore.openClose()
}

const el = useTemplateRef('el')
const { isSwiping: _isSwiping, direction: _direction } = usePointerSwipe(el, {
  onSwipeEnd: () => {
    toggleSidebar()
  },
})
</script>

<template>
  <UDrawer v-model:open="open" :handle="true" direction="left" @close="toggleSidebar">
    <template #content>
      <div
        class="grid grid-rows-14 ps-6 pe-2.5 justify-center max-w-64 min-w-56 h-screen z-10 bg-(--ui-bg)"
      >
        <section
          class="flex flex-col items-center justify-start w-full row-span-4"
        >
          <div class="mt-1 ml-auto mr-2">
            <DarkModeSwitch />
          </div>
          <UIcon
            name="i-custom-bus"
            class="duration-300 ease-in-out scale-100 cursor-pointer text-primary-500 size-32 hover:scale-105"
            @click="useRouter().push('/home')"
          />
          <h1 class="mt-1 text-2xl font-bold text-center text-primary-500">
            SGTI <span class="dark:text-white">UCI</span>
          </h1>
        </section>
        <div
          v-if="isAuthenticated"
          class="max-h-full px-2 py-3 overflow-x-hidden bg-gray-100 row-span-8 rounded-2xl dark:bg-navbardark-500 no-scrollbar h-fit"
        >
          <SidebarAdminLinks v-if="user?.roles.includes('admin')" />
          <SidebarChoferLinks v-else-if="user?.roles.includes('chofer')" />
          <SidebarSuminLinks v-else-if="user?.roles.includes('suministrador')" />
        </div>
        <div class="row-span-2">
          <CurrentUser />
        </div>
      </div>
    </template>
  </UDrawer>
  <!--
  <div
    class="absolute w-20 h-20 shadow-xl overflow-hidden rotate-[40deg] -top-10 -left-12 bg-primary-500 z-60 hover:bg-primary-600 cursor-pointer"
    @click="toggleSidebar"
  /> -->

  <!-- <UButton
    class="absolute w-20 h-8 -rotate-90 cursor-pointer -left-6 z-60 top-1/2"
    color="neutral"
    variant="ghost"
    trailing-icon="i-lucide-chevron-down"
    :ui="{
      trailingIcon: open ? 'rotate-180 m-auto transition-transform duration-200' : 'rotate-0 m-auto transition-transform duration-200',
    }"
    block
    size="xl"
    @click="toggleSidebar"
  /> -->

  <div
    ref="el" class="absolute z-30 flex items-end w-10 top-1/12 h-11/12"
  >
    <DevOnly>
      <h1 class="select-none z-999">
        {{ fps }}
      </h1>
    </DevOnly>
  </div>
</template>
