<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: Number,
  height: Number,
  location: String,
  timeOfDay: String,
  opponentName: {
    type: String,
    default: '',
  },
  opponentUrl: {
    type: String,
    default: '',
  }
})

const urls = computed(() => {
  const { location, timeOfDay } = props
  return {
    bg: `/img/bg-${location}-${timeOfDay}.png`,
    mg: `/img/mg-${location}-${timeOfDay}.png`,
    fg: `/img/fg-${location}-${timeOfDay}.png`,
  }
})
</script>

<template>
  <div
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`,
    }"
    class="relative"
  >
    <img :src="urls.bg" alt="A super intense battle between two well-matched adversaries" class="background absolute w-full h-full">

    <div class="status status--opponent absolute w-1/2 p-8 color-black bg-white after:absolute">
      {{ opponentName.toUpperCase() }}
      <div class="health-bar health-bar--opponent flex align-center">
        <span class="color-yellow bg-black">HP: </span>
        <progress value="100" min="0" max="100"></progress>
      </div>
    </div>

    <div class="opponent-wrapper grid justify-items-center absolute">
      <img :src="props.opponentUrl" alt="" class="opponent">
      <img :src="urls.mg" alt="" class="midground">
    </div>
    <img :src="urls.fg" alt="" class="foreground absolute">
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
.status--opponent {
  top: 1rem;
  left: 1rem;
  border-width: 0 0 .125rem .25rem;
}
.status--opponent:after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -.125rem;
  transform: translateX(100%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: .5rem 0 0 1rem;
  border-color: transparent transparent transparent currentColor;
}
.health-bar {
  border: .125rem solid;
  border-top: 0;
}
.health-bar--opponent {
  border-right-width: .5rem;
}

progress[value] {
  border: 0;
  appearance: none;
  height: .5rem;
}
progress[value]::-webkit-progress-value {
  background: limegreen;
}
progress[value]::-moz-progress-bar { 
  background: limegreen;
}
.opponent-wrapper {
  top: 50%;
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
}
</style>