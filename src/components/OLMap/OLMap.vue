<script setup lang="ts">
import { onMounted, watch } from 'vue'
import OLMap from './OLMap'

const props = defineProps<{
  p1Latitude: number
  p1Longitude: number
  p2Latitude: number
  p2Longitude: number
}>()
let map: OLMap

const emit = defineEmits<{
  (e: 'update:km', value: number): void
  (e: 'update:m', value: number): void
}>()

onMounted(async () => {
  map = new OLMap(
    'map',
    [props.p1Latitude, props.p1Longitude],
    [props.p2Latitude, props.p2Longitude]
  )
  const distance = map.update(
    [props.p1Latitude, props.p1Longitude],
    [props.p2Latitude, props.p2Longitude]
  )
  emit('update:km', Math.round(distance / 10) / 100)
  emit('update:m', Math.round(distance * 100) / 100)
})

watch(
  [
    () => props.p1Latitude,
    () => props.p1Longitude,
    () => props.p2Latitude,
    () => props.p2Longitude
  ],
  async (newValues) => {
    const distance = map.update([newValues[0], newValues[1]], [newValues[2], newValues[3]])
    emit('update:km', Math.round(distance / 10) / 100)
    emit('update:m', Math.round(distance * 100) / 100)
  }
)
</script>

<template>
  <div id="map" class="fit col-12"></div>
</template>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
