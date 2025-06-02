<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const date = new Date()
const nowDate = new CalendarDate(
  date.getFullYear(),
  date.getMonth() + 1, // Months are 1-indexed (1 = January)
  date.getDate(),
)

const modelValue = shallowRef(nowDate)

function getColorByDate(date: Date) {
  const isWeekend = date.getDay() % 6 === 0
  const isDayMeeting = date.getDay() % 3 === 0

  if (isWeekend) {
    return undefined
  }

  if (isDayMeeting) {
    return 'error'
  }

  return 'success'
}
</script>

<template>
  <div class="p-4 w-fit dark:bg-navbardark-500 rounded-2xl border-2 border-(--ui-border)">
    <UCalendar v-model="modelValue">
      <template #day="{ day }">
        <UChip :show="!!getColorByDate(day.toDate('UTC'))" :color="getColorByDate(day.toDate('UTC'))" size="2xs">
          {{ day.day }}
        </UChip>
      </template>
    </UCalendar>
  </div>
</template>
