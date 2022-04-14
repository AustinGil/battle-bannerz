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
    <h1 class="font-poke" data-content="Battle Banners" id="font">Battle Banners</h1>
    <p class="mbe-16 font-poke" data-content="A Pokémon battle scene generator for social media banners!">A Pokémon battle scene generator for social media banners!</p>
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

    <a href="https://austingil.com"><p class="font-poke" data-content="Made with ♥ by Austin Gil">Made with ♥ by Austin Gil</p></a>
  </main>
</template>

<style>
.app-main {
  background: #248DD3;
  background: -moz-linear-gradient(top, #248DD3 0%, #2CABFF 53%, #0DB1C9 100%);
  background: -webkit-linear-gradient(top, #248DD3 0%, #2CABFF 53%, #0DB1C9 100%);
  background: linear-gradient(to bottom, #248DD3 0%, #2CABFF 53%, #0DB1C9 100%);
  /* background: white; */
}
body {
  background: #0DB1C9;
  background: -moz-linear-gradient(top, #0DB1C9 0%, #2CABFF 53%, #248DD3 100%);
  background: -webkit-linear-gradient(top, #0DB1C9 0%, #2CABFF 53%, #248DD3 100%);
  background: linear-gradient(to bottom, #0DB1C9 0%, #2CABFF 53%, #248DD3 100%);
  /* background: white; */
}
.font-poke {
  font-family: 'Poke', sans-serif;
  color: var(--yellow-700);
  text-shadow:
    0 -3px var(--blue-default),
    3px 0 var(--blue-default),
    0 3px var(--blue-default),
    -3px 0 var(--blue-default),
    3px 3px var(--blue-default),
    -3px 3px var(--blue-default),
    3px -3px var(--blue-default),
    -3px -3px var(--blue-default),
    -5px 4px var(--blue-800);
  position: relative;
}
.font-poke:after {
  content: attr(data-content);
  position: absolute;
  inset: 0;
  color: transparent;
  text-shadow: -1px 1px var(--yellow-default);
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