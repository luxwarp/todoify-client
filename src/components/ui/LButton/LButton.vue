<template>
  <component
    :is="type"
    :to="to"
    class="lButton"
    :class="designClass"
    @click="$emit('click', $event)"
  >
    <slot>LButton slot</slot>
  </component>
</template>

<script>
export default {
  name: "LButton",
  props: {
    design: {
      type: String,
      required: false,
      default: ""
    },
    to: {
      type: [String, Object],
      required: false,
      default: null
    }
  },
  computed: {
    designClass() {
      return this.design ? `lButton__${this.design}` : null;
    },
    type() {
      return this.to ? "router-link" : "button";
    }
  }
};
</script>

<style lang="scss" scoped>
.lButton {
  cursor: pointer;
  transition: all 0.4s;
  border-radius: 3px;
  width: max-content;
  display: block;
  padding: 10px;
  border: 0;

  :last-child {
    margin-left: 10px;
  }

  :only-child {
    margin-left: 0;
  }

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
