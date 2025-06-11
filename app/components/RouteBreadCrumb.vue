<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

defineProps({
  items: {
    type: Array<BreadcrumbItem>,
    required: true,
  },
})

const commonStore = useCommonStore()
</script>

<template>
  <div
    class="z-20 w-full h-1/12 bg-(--ui-bg) items-center flex ps-2 border-b-2 border-b-gray-100/70 dark:border-white/25"
  >
    <UButton
      class="w-10 h-10 -rotate-90 cursor-pointer bg-(--ui-bg) dark:bg-navbardark-700 mx-1"
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
      class="duration-300 ease-in-out scale-100 cursor-pointer text-primary-500 size-7 hover:scale-105"
      @click="useRouter().push('/home')"
    />
    <h1 class="mt-1 ml-1 mr-3 text-2xl font-bold text-center cursor-pointer text-primary-500" @click="useRouter().push('/home')">
      SGTI <span class="dark:text-white">UCI</span>
    </h1>
    <UBreadcrumb :items="items">
      <template #dropdown="{ item }">
        <!-- @vue-ignore -->
        <UDropdownMenu :items="item.children" arrow>
          <!-- @vue-ignore -->
          <UButton
            :label="item.label"
            :icon="item.icon"
            color="neutral"
            variant="link"
            class="p-0.5"
          />
        </UDropdownMenu>
      </template>
      <template #separator>
        <span class="mx-2 text-(--ui-text-muted)">/</span>
      </template>
    </UBreadcrumb>
    <div class="my-2 w-72 ms-auto">
      <CurrentUser />
    </div>
  </div>
  <div class="flex w-full px-3 bg-neutral-850 h-11/12">
    <div class="grid m-2.5 rounded-2xl grid-rows-11 w-full gap-y-3">
      <slot />
    </div>
  </div>
</template>

<style></style>
