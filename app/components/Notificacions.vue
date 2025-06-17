<script lang="ts" setup>
interface Notification {
  icon: string
  message: string
  time: string
}

const isDropdownOpen = ref(false)

// Lista de notificaciones
const notifications: Notification[] = [
  {
    icon: 'i-lucide-message-square-text',
    message: 'Nuevo mensaje de Juan',
    time: 'Hace 10 minutos',
  },
  {
    icon: 'i-lucide-cog',
    message: 'Solicitud de Pieza Aceptada',
    time: 'Hace 20 minutos',
  },
  {
    icon: 'i-lucide-mail-question',
    message: 'Solicitud de refuerzo aceptada',
    time: 'Hace 1 hora',
  },
  {
    icon: 'i-lucide-triangle-alert',
    message: 'Nueva solicitud de apoyo por avería',
    time: 'Hace 2 horas',
  },
]

// Función para alternar el estado del dropdown
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
defineExpose({
  toggleDropdown,
  isDropdownOpen,
})
</script>

<template>
  <div class="relative">
    <!-- Botón de notificaciones -->
    <UButton
      icon="i-lucide-bell"
      size="md"
      color="primary"
      variant="ghost"
      @click="toggleDropdown"
    />

    <!-- Dropdown de notificaciones -->
    <div v-if="isDropdownOpen" class="absolute right-0 mt-2 rounded-lg shadow-lg z-70 w-72  bg-(--ui-bg) dark:bg-navbardark-500">
      <div class="p-4">
        <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Notificaciones
        </h4>
        <USeparator color="neutral" type="solid" size="lg" />
        <div class="mt-2 space-y-1">
          <div v-for="(notification, index) in notifications" :key="index" class="flex items-center p-2 space-x-1 rounded-lg hover:bg-gray-100 dark:hover:bg-navbardark-700">
            <UIcon :name="notification.icon" class="text-gray-500 dark:text-gray-300" size="20" />
            <div class="flex-1 ms-2">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                {{ notification.message }}
              </p>
              <small class="text-xs text-gray-500 dark:text-gray-400">{{ notification.time }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
