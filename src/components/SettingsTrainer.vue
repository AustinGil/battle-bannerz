<script setup>
import globalStore from '../store.js'
</script>

<template>
  <fieldset>
    <legend>Trainer</legend>
    <AppInput
      v-model="globalStore.trainerBox"
      label="Box Type"
      name="trainerBox"
      type="radio"
      :options="[{ label: 'Status', value: 'status' }, { label: 'Text', value: 'text' }]"
      class="mbe-16"
    />

    <template v-if="globalStore.trainerBox === 'status'">
      <AppInput
        v-model="globalStore.trainerName"
        label="Name"
        name="trainerName"
        class="mbe-16"
      />
      <AppInput
        v-model="globalStore.trainerHealth"
        label="Health"
        name="trainerHealth"
        type="range"
        class="mbe-16"
      />
    </template>

    <template v-else>
      <AppInput
        v-model="globalStore.trainerText"
        label="Text"
        type="textarea"
        name="trainerText"
        class="mbe-16"
        @change="globalStore.customText = true"
      />
    </template>
  </fieldset>
</template>