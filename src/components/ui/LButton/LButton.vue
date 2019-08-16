<template>
  <button class="lButton" :class="designClass" @click="$emit('click', $event)">
    <slot>LButton slot</slot>
  </button>
</template>

<script>
export default {
  name: "LButton",
  props: {
    design: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    designClass() {
      return this.design ? `lButton__${this.design}` : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.lButton {
  cursor: pointer;
  &.lButton__noStyle {
    background: none;
    border: 0;
    color: inherit;
    padding: 0;
  }
}
</style>
