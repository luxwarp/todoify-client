<template>
  <div class="toolboxcontainer">
    <div class="toggle" @click="show = !show">
      <slot name="toggle"><i class="material-icons">more_vert</i></slot>
    </div>
    <div class="tools" v-if="show" @click="show = !show">
      <slot name="tools"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBox',
  data () {
    return {
      show: false
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

  .toggle {
  }

  .tools {
    display: flex;
    flex-direction: row;
    margin: 0 10px;
  }
}

</style>
