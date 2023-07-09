<script setup lang="ts">
import type { LiteralUnion } from 'quasar'
import { watch } from 'vue'

const props = defineProps<{
  title: string
  value: number
  type: LiteralUnion<'lat' | 'lon', string>
}>()

const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>()

const bounds = props.type === 'lat' ? [-90, 90] : [-180, 180]

const updateInput = (value: string | number | null) => {
  if (value === null) {
    emit('update:value', NaN)
    return
  }
  if (typeof value === 'number') {
    emit('update:value', value)
    return
  }
  value = value.replace(',', '.')
  const parsed = Number(value)
  if (Number.isNaN(parsed)) {
    emit('update:value', NaN)
    return
  }
  if (!(bounds[0] <= parsed && parsed <= bounds[1])) {
    emit('update:value', NaN)
    return
  }
  emit('update:value', parsed)
}

watch(
  () => props.value,
  async (newValue, prevValue) => {
    if (Number.isNaN(newValue)) {
      emit('update:value', prevValue)
      return
    }
  }
)
</script>

<template>
  <div>
    <q-input
      filled
      :model-value="value"
      @update:model-value="updateInput"
      :label="title"
      :rounded="false"
      label-color="primary"
      bg-color="secondary"
    />
  </div>
</template>

<style scoped></style>
