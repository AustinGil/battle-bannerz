<script setup>
import { toJpeg } from 'html-to-image';
import globalStore from '../store.js'
import SettingsScene from './SettingsScene.vue'
import SettingsOpponent from './SettingsOpponent.vue'
import SettingsTrainer from './SettingsTrainer.vue';

const pokeCenter = new Audio('/audio/pokecenter.mp3')
function handleSubmit(event) {
  pokeCenter.play()
  event.preventDefault()
  const preview = document.getElementById('preview')
  toJpeg(preview, { quality: 0.95 })
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'battle-banner.jpeg';
      link.href = dataUrl;
      link.click();
    });
}
</script>

<template>
  <VForm @valid="handleSubmit">
    <VTabs :classes="{ tablist: 'grid columns-3' }">
      <template #tab-scene>Scene</template>
      <template #panel-scene>
        <SettingsScene />
      </template>
      
      <template #tab-opponent>Opponent</template>
      <template #panel-opponent>
        <SettingsOpponent />
      </template>

      <template #tab-trainer>Trainer</template>
      <template #panel-trainer>
        <SettingsTrainer
          :data="globalStore"
        />
      </template>
    </VTabs>
    <VBtn type="submit">Generate Banner</VBtn>
  </VForm>
</template>