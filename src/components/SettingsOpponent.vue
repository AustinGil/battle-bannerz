<script setup>
import pokemonList from '../data/pokemonList.js'
import globalStore from '../store.js'

function setOpponent(event) {
  const select = event.target
  const pokemonNum = Number(select.value)
  const pokemon = pokemonList[pokemonNum - 1]
  const audioEl = new Audio()
  audioEl.src = `/audio/cries/${pokemon.num}.ogg`
  audioEl.play()
  globalStore.opponentName = pokemon.name
  globalStore.opponentUrl = `/img/pokemon/${pokemon.num}.png`
  if (!globalStore.customText) {
    globalStore.trainerText = `A wild ${pokemon.name.toUpperCase()} appeared!`
  }
}
function onFileChange(event) {
  const files = event.target.files;
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
    const audioEl = new Audio()
    audioEl.src = `/audio/cries/${randomPokeNum}.ogg`
    audioEl.play()
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
    <VInput
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

    <VInput
      label="Sprite"
      name="sprite"
      type="file"
      @change="onFileChange($event)"
      class="mbe-16"
    />

    <VInput
      v-model="globalStore.opponentName"
      label="Name"
      name="opponentName"
      class="mbe-16"
    />

    <VInput
      v-model="globalStore.opponentHealth"
      label="Health"
      name="opponentHealth"
      type="range"
      class="mbe-16"
    />
  </fieldset>
</template>