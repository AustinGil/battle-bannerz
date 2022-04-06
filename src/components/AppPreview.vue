<script setup>
import { computed } from 'vue'
import globalStore from '../store.js'

const displaySize = computed(() => ({
  width: Math.max(globalStore.width, 600),
  height: Math.max(globalStore.height, 200)
}))
const urls = computed(() => {
  const { location, timeOfDay } = globalStore
  return {
    bg: `/img/bg-${location}-${timeOfDay}.png`,
    mg: `/img/mg-${location}-${timeOfDay}.png`,
    fg: `/img/mg-${location}-${timeOfDay}.png`,
  }
})
const getHealthBarColor = (value) => {
  if (value < 25) return 'firebrick'
  if (value < 50) return 'gold'
  return 'limegreen'
}
</script>

<template>
  <div
    :style="{
      width: `${displaySize.width}px`,
      height: `${displaySize.height}px`,
    }"
    class="relative overflow-hidden"
  >
    <img :src="urls.bg" alt="A super intense battle between two well-matched adversaries" class="background absolute w-full h-full">

    <div class="status status--opponent absolute w-1/2 p-8 color-black bg-white">
      {{ globalStore.opponentName.toUpperCase() }}
      <div class="health-bar health-bar--opponent flex align-center">
        <span class="color-yellow bg-black">HP: </span>
        <!-- <progress value="100" min="0" max="100"></progress> -->
        <div
          :style="{
            '--health': `${globalStore.opponentHealth}%`,
            '--health-bar-color': getHealthBarColor(globalStore.opponentHealth)
          }"
          class="health-bar__bar"
        ></div>
      </div>
    </div>

    <div class="opponent-wrapper grid justify-items-center absolute">
      <img :src="globalStore.opponentUrl" alt="" class="opponent">
      <img :src="urls.mg" alt="" class="midground">
    </div>
    <img :src="urls.fg" alt="" class="foreground absolute">

    <div v-if="globalStore.trainerBox === 'status'" class="status status--trainer absolute w-1/2 p-8 color-black bg-white">
      {{ globalStore.trainerName.toUpperCase() }}
      <div class="health-bar health-bar--opponent flex align-center">
        <span class="color-yellow bg-black">HP: </span>
        <!-- <progress value="100" min="0" max="100"></progress> -->
        <div
          :style="{
            '--health': `${globalStore.trainerHealth}%`,
            '--health-bar-color': getHealthBarColor(globalStore.trainerHealth)
          }"
          class="health-bar__bar"
        ></div>
      </div>
    </div>
    <div v-else class="dialog absolute w-1/2 color-black bg-white">
      <p>{{ globalStore.trainerText }}</p>
    </div>
  </div>
</template>

<style scoped>
.background {
  z-index: -1;
  object-fit: cover;
}
.status {
  border-style: solid;
}
.status:after {
  content: "";
  position: absolute;
  bottom: -.125rem;
  width: 0;
  height: 0;
  border-style: solid;
}
.status--opponent {
  top: .125rem;
  left: .125rem;
  border-width: 0 0 .125rem .25rem;
}
.status--opponent:after {
  right: 0;
  transform: translateX(100%);
  border-width: .5rem 0 0 1rem;
  border-color: transparent transparent transparent currentColor;
}
.status--trainer {
  border-width: 0 .25rem .125rem 0;
}
.status--trainer:after {
  left: 0;
  transform: translateX(-100%);
  border-width: 0 0 .5rem 1rem;
  border-color: transparent transparent currentColor transparent;
}
.health-bar {
  border: .125rem solid;
  border-top: 0;
}
.health-bar--opponent {
  border-right-width: .5rem;
}

.health-bar__bar {
  --health: 100%;
  --health-bar-color: limegreen;
  width: 100%;
}
.health-bar__bar::before {
  content: '';
  display: block;
  height: .5rem;
  width: var(--health);
  background: var(--health-bar-color);
}
.opponent-wrapper {
  top: 45%;
  right: 1rem;
  transform: translateY(-65%);
}
.opponent {
  z-index: 1;
  max-width: 6rem;
  max-height: 6rem;
}
.midground {
  margin-top: -1rem;
}
.foreground {
  bottom: 0;
  transform: scale(2.5) translateY(25%);
}
.status--trainer,
.dialog {
  bottom: .125rem;
  right: .125rem;
}
.dialog {
  border: 4px double;
  border-radius: 4px;
  padding: 4px;
}
</style>