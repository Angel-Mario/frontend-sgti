<template>
  <div class="grid grid-rows-14 justify-center max-w-64 min-w-56 h-screen shadow-[7px_0px_22px_4px_rgba(0,_0,_0,_0.1)]">

    <section class="flex flex-col items-center justify-start w-full row-span-4">
      <div class="mt-1 ml-auto mr-2">
        <LazyDarkModeSwitch />
      </div>
      <UIcon name="i-custom-bus" class="text-primary-500 size-32" />
      <h1 class="mt-1 text-2xl font-bold text-center text-primary-500">SGTI <span class="text-white">UCI</span>
      </h1>

    </section>
    <div class="p-2 overflow-x-hidden row-span-8 rounded-2xl bg-navbardark-500 no-scrollbar">
      <LazySidebarAdminLinks />
    </div>
    <div class="row-span-2">
      <CurrentUser />
    </div>

  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>