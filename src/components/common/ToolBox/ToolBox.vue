<template>
  <div class="toolboxcontainer" :class="{ reverse: reverse }">
    <div @click="show = !show">
      <slot name="toggle"><i class="fas fa-ellipsis-v"></i></slot>
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

<style lang="scss" scoped>
.toolboxcontainer {
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
    display: inline-flex;
    flex-direction: row;
    margin-left: 10px;
  }
}
</style>
