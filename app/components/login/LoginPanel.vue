<script lang="ts" setup></script>

<template>
  <section
    class="sm:w-[600px] h-96 rounded-2xl border-2 border-(--ui-border) bg-navbardark-500 my-auto overflow-hidden sm:scale-110"
  >
    <div class="grid h-full grid-cols-8">
      <div class="relative flex h-full col-span-5 overflow-hidden">
        <LoginFigureDecoration />
      </div>
      <div class="flex justify-center w-full col-span-3">
        <div class="flex flex-col items-center justify-center py-2 ps-2 pe-6">
          <div class="flex justify-center mb-3">
            <h1 class="text-2xl font-bold select-none text-primary-500">
              Login
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  </section>
</template>
