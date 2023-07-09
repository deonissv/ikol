<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  opened: { type: Boolean, required: false, default: true }
})

import { ref } from 'vue'

const visible = ref(props.opened)
const fs = ref<HTMLElement | null>(null)

const toggle = () => {
  visible.value = !visible.value
}
</script>

<template>
  <Transition name="slide-fade">
    <div class="wrapper" style="max-width: 500px">
      <fieldset v-bind:class="visible ? 'fsShow' : 'fsHide'" ref="fs">
        <legend v-bind:class="visible ? 'legendShow' : 'legendHide'" @click="toggle">
          {{ title }}
        </legend>
        <q-slide-transition>
          <div v-show="visible">
            <slot></slot>
          </div>
        </q-slide-transition>
      </fieldset>
    </div>
  </Transition>
</template>

<style scoped>
legend {
  font-size: large;
  padding: 0 1rem;
  cursor: pointer;
}

.legendShow {
  margin-left: 5px;
  transition: all 0.5s linear;
}

.legendHide {
  margin-left: calc(50% - 5ch);
  transition: all 0.5s linear;
}

fieldset {
  border-top: 3px solid #808080;
}

.fsHide {
  animation: noBorder 0.5s linear 0s 1 normal forwards;
  border: 0;
}

.fsShow {
  border: 0;
  border-top: 3px solid #808080;
  animation: fullBorder 0.5s linear 0s 1 normal forwards;
}

@keyframes fullBorder {
  75% {
    border-left: 3px solid #808080;
    border-right: 3px solid #808080;
  }

  100% {
    border: 3px solid #808080;
  }
}

@keyframes noBorder {
  0% {
    border-top: 3px solid #808080;
    border-left: 3px solid #808080;
    border-right: 3px solid #808080;
    border-bottom: 3px solid #808080;
  }

  25% {
    border-top: 3px solid #808080;
    border-left: 3px solid #808080;
    border-right: 3px solid #808080;
  }

  100% {
    border-top: 3px solid #808080;
  }
}
</style>
