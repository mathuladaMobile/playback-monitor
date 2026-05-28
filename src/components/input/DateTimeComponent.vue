<template>
  <div class="date-time-component">
    <label v-if="label" class="date-time-label">{{ label }}</label>
    <div class="date-time-inputs">
      <input
        type="date"
        :value="dateValue"
        @input="updateDate($event.target.value)"
        class="date-input"
      />
      <input
        type="time"
        :value="timeValue"
        @input="updateTime($event.target.value)"
        class="time-input"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const formatDateTime = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return { date: '', time: '' }
  }

  const pad = (num) => String(num).padStart(2, '0')
  return {
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`
  }
}

const { date, time } = formatDateTime(props.modelValue)

const dateValue = computed(() => date)
const timeValue = computed(() => time)

const emitValue = (datePart, timePart) => {
  if (!datePart || !timePart) {
    emit('update:modelValue', '')
    return
  }

  emit('update:modelValue', `${datePart}T${timePart}:00`)
}

const updateDate = (value) => {
  emitValue(value, timeValue.value)
}

const updateTime = (value) => {
  emitValue(dateValue.value, value)
}
</script>

<style scoped>
.date-time-component {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.date-time-inputs {
  display: flex;
  gap: 0.5rem;
}

.date-time-label {
  font-size: 0.95rem;
  color: #333;
}

.date-input,
.time-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
