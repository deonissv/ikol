<script setup lang="ts">
defineProps<{
  unit: string
  distance: number
}>()
</script>

<template>
  <div class="fit row justify-between">
    <div class="title">
      <span> Odległość [{{ unit }}]</span>
    </div>
    <div class="flex a sub">{{ distance }}</div>
  </div>
</template>

<style scoped>
.title {
  font-size: medium;
}

.sub {
  font-size: medium;
  font-weight: bold;
}
</style>
