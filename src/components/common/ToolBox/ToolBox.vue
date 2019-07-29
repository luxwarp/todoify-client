<template>
  <div class="toolBoxContainer" :class="{ reverse: reverse }">
    <div @click="show = !show">
      <slot name="toggle"><i class="icon-ellipsis-vert"></i></slot>
    </div>
    <transition :name="animation">
      <div v-if="show" class="tools" @click="show = !show">
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

<style lang="scss">
.toolBoxContainer {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  &.reverse {
    flex-direction: row-reverse;

    > .tools {
      margin-right: 10px;
    }
  }

  > .tools {
    display: flex;
    flex-direction: row;
    margin-left: 10px;

    * {
      margin-right: 10px;
    }

    *:last-child {
      margin-right: 0px;
    }
  }
}
</style>
