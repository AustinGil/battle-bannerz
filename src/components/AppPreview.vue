<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Scene
  width: Number,
  height: Number,
  location: String,
  timeOfDay: String,
  // Opponent
  opponentName: {
    type: String,
    default: '',
  },
  opponentUrl: {
    type: String,
    default: '',
  },
  opponentHealth: {
    type: Number,
    default: 100,
  },
  // Trainer
  trainerText: {
    type: String,
    default: 'A wild Pokémon appeared!',
  },
})

const urls = computed(() => {
  const { location, timeOfDay } = props
  return {
    bg: `/img/bg-${location}-${timeOfDay}.png`,
    mg: `/img/mg-${location}-${timeOfDay}.png`,
    fg: `/img/fg-${location}-${timeOfDay}.png`,
  }
})
const healthBarColor = computed(() => {
  const { opponentHealth } = props
  if (opponentHealth < 25) return 'firebrick'
  if (opponentHealth < 50) return 'gold'
  return 'limegreen'
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
        <!-- <progress value="100" min="0" max="100"></progress> -->
        <div
          :style="{
            '--health': `${opponentHealth}%`,
            '--health-bar-color': healthBarColor
          }"
          class="health-bar__bar"
        ></div>
      </div>
    </div>

    <div class="opponent-wrapper grid justify-items-center absolute">
      <img :src="props.opponentUrl" alt="" class="opponent">
      <img :src="urls.mg" alt="" class="midground">
    </div>
    <img :src="urls.fg" alt="" class="foreground absolute">

    
    <div class="dialog absolute w-1/2 color-black bg-white">
      <p>{{ trainerText }}</p>
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
.status--opponent {
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
}

.dialog {
  border: 4px double;
  border-radius: 4px;
  padding: 4px;
  bottom: 0;
  right: 0;
}
</style>