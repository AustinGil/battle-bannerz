<script setup>
// import { VFile } from 'vuetensils'
import pokemonList from '../data/pokemonList.js'
import globalStore from '../store.js'
import VFile from './VFile.vue'

function setOpponent(event) {
  const select = event.target
  const pokemonNum = Number(select.value)
  const pokemon = pokemonList[pokemonNum - 1]
  new Audio(`/audio/cries/${pokemon.num}.ogg`).play()
  globalStore.opponentName = pokemon.name
  globalStore.opponentUrl = `/img/pokemon/${pokemon.num}.png`
  if (!globalStore.customText) {
    globalStore.trainerText = `A wild ${pokemon.name.toUpperCase()} appeared!`
  }
}
function onFileChange(files) {
  if (!files.length) {
    globalStore.opponentUrl = ''
    return;
  }
  const file = files[0]
  let name = file.name
  name = name.slice(0, name.lastIndexOf('.'))
  // Create the image preview with a data url
  const reader = new FileReader();
  reader.onload = (event) => {
    globalStore.opponentUrl = event.target.result;
    globalStore.opponentName = name
    const randomPokeNum = Math.floor(Math.random() * pokemonList.length) + 1

    new Audio(`/audio/cries/${randomPokeNum}.ogg`).play()
    
    if (!globalStore.customText) {
      globalStore.trainerText = `A wild ${name.toUpperCase()} appeared!`
    }
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <fieldset>
    <legend>Opponent</legend>
    <AppInput
      label="Pokemon"
      name="opponent-preset"
      type="select"
      :value="globalStore.opponentNum"
      :options="pokemonList.map(poke => {
        return {
          value: poke.num,
          label: poke.name,
        }
      })"
      @change="setOpponent($event)"
      class="mbe-16"
    />

    <VFile
      label="Sprite"
      name="sprite"
      :classes="{
        input: 'opponent-sprite',
        dropzone: 'mbe-16 radius-4 p-16 color-black bg-white'
      }"
      @update="onFileChange($event)"
    />

    <AppInput
      v-model="globalStore.opponentName"
      label="Name"
      name="opponentName"
      class="mbe-16"
    />

    <AppInput
      v-model="globalStore.opponentHealth"
      label="Health"
      name="opponentHealth"
      type="range"
      class="mbe-16"
    />
  </fieldset>
</template>

<style>
/* .dropzone {
  display: flex;
  justify-content: center;
  border: 2px solid var(--color-highlight);
  padding: 1.5rem;
}
.opponent-sprite:focus + .dropzone {
  outline: var(--outline-width,3px) solid transparent;
  box-shadow: 0 0 0 var(--outline-width,3px) var(--accent-color,Highlight);
} */


.vts-file__dropzone {
  display: flex;
  justify-content: center;
  border: 2px solid var(--color-highlight);
  transition: 0.2s ease background-color;
}
.opponent-sprite:focus ~ .vts-file__dropzone {
  outline: var(--outline-width,3px) solid transparent;
  box-shadow: 0 0 0 var(--outline-width,3px) var(--accent-color,Highlight);
} */
.vts-file--droppable .vts-file__dropzone {
  background: var(--color-highlight);
}
</style>