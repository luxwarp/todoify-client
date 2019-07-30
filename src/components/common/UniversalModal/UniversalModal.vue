<template>
  <div class="universalModal">
    <div class="container">
      <div class="title">
        <slot name="title">title slot</slot>
        <i class="icon-cancel close" @click="close"></i>
      </div>
      <div class="body">
        <slot name="body">body slot</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UniversalModal",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.universalModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;

  > .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    background: #fff;
    padding: 0 15px;

    > .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      > .close {
        cursor: pointer;
      }
    }

    > .body {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
