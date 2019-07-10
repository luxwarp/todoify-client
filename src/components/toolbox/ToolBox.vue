<template>
  <div class="toolboxcontainer">
    <div class="toggle" @click="show = !show">
      <slot name="toggle"><i class="material-icons">more_vert</i></slot>
    </div>
    <transition :name="animation">
      <div class="tools" v-if="show" @click="show = !show">
        <slot name="tools"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ToolBox',
  data() {
    return {
      show: false
    }
  },
  props: {
    animation: {
      type: String,
      required: false,
      default: () => {
        return 'fadeIn'
      }
    }
  }
}
</script>

<style lang="scss">
.toolboxcontainer {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  > .toggle {
  }

  > .tools {
    display: inline-flex;
    flex-direction: row;
    margin: 0 10px;
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(0%);
    }
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0%);
    }
  }

  > .slideInLeft-enter-active {
    animation: slideInLeft 0.5s;
  }

  > .slideInLeft-leave-active {
    animation: slideInLeft 0.5s reverse;
  }

  > .slideInRight-enter-active {
    animation: slideInRight 0.5s;
  }

  > .slideInRight-leave-active {
    animation: slideInRight 0.5s reverse;
  }
}
</style>
