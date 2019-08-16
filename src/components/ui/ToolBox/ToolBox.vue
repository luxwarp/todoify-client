<template>
  <div
    class="toolBoxContainer"
    :class="{ reverse: reverse }"
    @click="show = !show"
  >
    <button class="toggle" aria-label="tools">
      <slot name="toggle"><i class="icon-ellipsis-vert"></i></slot>
    </button>
    <transition :name="animation">
      <div v-if="show" class="tools">
        <slot name="tools"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ToolBox",
  props: {
    reverse: {
      type: Boolean,
      required: false,
      default: false
    },
    animation: {
      type: String,
      required: false,
      default: () => {
        return "fadeIn";
      }
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="scss" scoped>
.toolBoxContainer {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: normal;
  padding-left: 10px;

  > .toggle {
    padding: 0;
    background: none;
    border: 0;
    cursor: pointer;
    appearance: none;
  }
  > .tools {
    display: flex;
    flex-direction: row;
    margin-left: 10px;

    ::v-deep * {
      margin: 0;
      margin-right: 10px;
    }

    ::v-deep *:last-child {
      margin-right: 0px;
    }
  }

  &.reverse {
    flex-direction: row-reverse;

    > .tools {
      margin-right: 10px;
    }
  }
}
</style>
