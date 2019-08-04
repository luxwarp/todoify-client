<template>
  <div class="universalModal">
    <div class="container">
      <h1 class="title">
        <slot name="title">title slot</slot>
        <button class="close" @click="close">
          <i class="icon-cancel"></i>
        </button>
      </h1>
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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  z-index: 99999;
  overflow: auto;
  display: flex;

  > .container {
    width: 100%;
    max-width: 600px;
    background: #fff;
    padding: 15px;
    margin: auto;
    border-radius: 5px;

    > .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 0 15px 0;
      padding: 0;
      font-size: 1.2rem;
      font-weight: 300;

      > .close {
        cursor: pointer;
        appearance: none;
        background: none;
        border: 0;
        padding: 0;
      }
    }

    > .body {
      display: flex;
      flex-direction: column;

      > :last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
