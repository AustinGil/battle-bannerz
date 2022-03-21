<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  }
}
</script>

<template>
  <svg :class="`icon ${href}`">
    <use v-bind:xlink:href="`#${href}`"></use>
  </svg>
</template>

<style>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
</style>
