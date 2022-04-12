<template>
  <VInput :classes="{ input: 'app-input__input radius-4 color-black bg-white'}"></VInput>
</template>

<style>
.app-input__input {
  border: 2px solid var(--color-highlight);
}
.vts-input--radio .vts-input__input {
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.vts-input--radio .vts-input__input:checked {
  background: radial-gradient(var(--color-secondary), var(--color-secondary) 40%, #fff 40%);
}
</style>
