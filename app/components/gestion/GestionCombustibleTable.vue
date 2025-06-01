<!-- <script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const value = ref({ start: new CalendarDate(2022, 2, 1), end: new CalendarDate(2022, 2, 22) })

const authStore = useAuthStore()
const query = shallowRef('')
const toast = useToast()

const { data, refresh } = useFetch<Terminal>(
  '/vehicular/solicitudes-piezas/load-solicitud-pieza-form-data',
  { ...makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`) },
)
</script>

<template>
  <UCalendar v-model="value.start" range />
</template> -->

<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const value = ref(new CalendarDate(2022, 2, 9))
</script>

<template>
  <UCalendar v-model="value" />
</template>
