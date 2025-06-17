<script lang="ts" setup>
defineProps({
  align: {
    type: String,
    required: false,
    default: 'flex-col',
  },
})

const router = useRouter()

const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div :class="`flex ${align} items-center justify-center min-w-36 w-auto h-full`">
    <h2 v-once class="mb-1 font-bold text-center text-md text-neutral-500">
      usuario: {{ authStore.user?.nombre_u }}
    </h2>
    <UButton
      icon="i-lucide-log-out"
      size="md"
      color="primary"
      class="flex justify-center w-36"
      variant="ghost"
      @click="handleLogout"
    >
      Cerrar sesión
    </UButton>
  </div>
</template>
