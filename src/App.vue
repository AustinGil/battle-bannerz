<script setup>
import { watch } from 'vue'
import globalStore from './store.js'
import { AppPreview, AppSvg } from './components/index.js'
import SettingsForm from './components/SettingsForm.vue'

watch(
  [() => globalStore.location, () => globalStore.timeOfDay], 
  ([newLocation, newTimeOfDay]) => {
    const queryParams = new URLSearchParams({
      location: newLocation,
      timeOfDay: newTimeOfDay,
    })
    window.history.replaceState({}, '', `?${queryParams}`)
  },
)
</script>

<template>
  <main class="app-main h-full p-16">
    <h1 class="font-poke" data-content="Battle Bannerz">Battle Bannerz</h1>
    <p class="mbe-16">A Pokémon battle scene generator for social media banners!</p>
    <div class="flex gap-8">
      <div class="w-1/4 p-12 radius-16 bg-red">
        <SettingsForm />
      </div>
  
      <div class="w-3/4">
        <AppPreview />
        <div class="avatar grid place-center radius-full">
          <AppSvg href="icon-user" ></AppSvg>
        </div>
      </div>
    </div>

    <p>Made with ♥ by <a href="https://austingil.com">Austin Gil</a>!</p>
  </main>
</template>

<style>
.app-main {
  background: linear-gradient(var(--blue-500), var(--blue-800));
}
.font-poke {
  position: relative;
  font-family: 'Poke', sans-serif;
  -webkit-text-stroke: 7px var(--blue-800);
}
.font-poke:before,
.font-poke:after {
  content: attr(data-content);
  position: absolute;
}
.font-poke:before {
  left: 2px;
  bottom: 2px;
  -webkit-text-stroke: 7px var(--blue-default);
}
.font-poke:after {
  left: 0;
  transform: translate(1px, -1px);
  color: var(--yellow-default);
  text-shadow: 2px -2px var(--yellow-800);
  -webkit-text-stroke: 0;
}
.avatar {
  width: 8rem;
  height: 8rem;
  border: 2px solid;
  position: absolute;
  transform: translate(1rem, -50%);
  font-size: 6rem;
  background-color: ButtonFace;
}
.vts-input--radio label {
  display: block;
}
.vts-input--radio input {
  margin-inline-end: .5rem;
}
</style>
