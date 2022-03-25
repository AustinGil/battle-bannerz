<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: Number,
  height: Number,
  location: String,
  timeOfDay: String,
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
    <div class="opponent-wrapper grid justify-items-center absolute">
      <img :src="props.opponentUrl" alt="" class="opponent">
      <img :src="urls.mg" alt="" class="midground">
    </div>
    <img :src="urls.fg" alt="" class="foreground absolute">
  </div>
</template>

<style scoped>
.background {
  object-fit: cover;
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