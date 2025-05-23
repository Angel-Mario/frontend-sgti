<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

defineProps({
  items: {
    type: Array<BreadcrumbItem>,
    required: true,
  },
})
</script>

<template>
  <div
    class="z-20 w-full h-1/12 bg-(--ui-bg) items-center flex ps-12 border-b-2 border-b-gray-100/70 dark:border-white/25"
  >
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
  </div>
  <div class="flex w-full px-3 bg-neutral-850 h-11/12">
    <div class="grid m-2.5 rounded-2xl grid-rows-11 w-full gap-y-3">
      <slot />
    </div>
  </div>
</template>

<style></style>
