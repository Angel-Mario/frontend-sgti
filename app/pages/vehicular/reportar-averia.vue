<script lang="ts" setup>
const toast = useToast()
const query = shallowRef('')
const authStore = useAuthStore()

const { data, status } = useFetch<ReportarAveriaPage>(
  '/vehicular/averias/load-averia-form-data',
  makeFetchOptions(query, toast, `Bearer ${authStore.getToken}`),
)
</script>

<template>
  <div />
</template>
