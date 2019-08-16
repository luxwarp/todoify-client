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
  transition: all 0.4s;
  width: max-content;
  display: block;

  &:disabled {
    background: $buttonBgColor !important;
    color: $buttonFontColor;
    cursor: not-allowed !important;
  }

  &.lButton__noStyle {
    background: none;
    color: inherit;
    padding: 0;
    border: 0;
  }

  &.lButton__primary {
    background: #30465c;
    color: #fff;

    &:hover,
    &:active,
    &:focus {
      background: lighten($color: #30465c, $amount: 10%);
    }
  }

  &.lButton__success {
    background: #5aaf50;
    color: #fff;

    &:hover,
    &:active,
    &:focus {
      background: lighten($color: #5aaf50, $amount: 10%);
    }
  }

  &.lButton__alert {
    background: #ef4835;
    color: #fff;

    &:hover,
    &:active,
    &:focus {
      background: lighten($color: #ef4835, $amount: 10%);
    }
  }
}
</style>
