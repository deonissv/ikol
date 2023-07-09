<script setup lang="ts">
import { reactive } from 'vue'
import CoordInput from './components/CoordInput.vue'
import DistanceOutput from './components/DistanceOutput.vue'
import PointExpansion from './components/PointExpansion.vue'
import OLMap from './components/OLMap'

const state = reactive({
  p1Latitude: 52.207459494054454,
  p1Longitude: 20.91505805730101,
  p2Latitude: 0,
  p2Longitude: 0,
  distanceKm: 0,
  distanceM: 0
})
</script>

<template>
  <div class="mapWrapper">
    <o-l-map
      :p1-latitude="state.p1Latitude"
      :p1-longitude="state.p1Longitude"
      :p2-latitude="state.p2Latitude"
      :p2-longitude="state.p2Longitude"
      v-model:km="state.distanceKm"
      v-model:m="state.distanceM"
    />
  </div>
  <div class="row justify-start z-max">
    <div class="col-2 z-max q-ma-lg">
      <div class="z-max">
        <point-expansion title="Punkt 1">
          <CoordInput
            class="q-my-md"
            title="Szerokość"
            v-model:value="state.p1Latitude"
            type="lat"
          />
          <CoordInput
            class="q-my-md"
            title="Długość"
            v-model:value="state.p1Longitude"
            type="lon"
          />
        </point-expansion>
        <point-expansion title="Punkt 2" :opened="false">
          <CoordInput
            class="q-my-md"
            title="Szerokość"
            v-model:value="state.p2Latitude"
            type="lat"
          />
          <CoordInput
            class="q-my-md"
            title="Długość"
            v-model:value="state.p2Longitude"
            type="lon"
          />
        </point-expansion>
      </div>
      <div class="z-max q-pa-md">
        <DistanceOutput unit="m" :distance="state.distanceM" />
        <DistanceOutput unit="km" :distance="state.distanceKm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mapWrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
