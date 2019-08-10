<template>
  <div class="lcard">
    <div v-if="$slots.header" class="lcard--header">
      <slot name="header">lcard header</slot>
    </div>
    <div class="lcard--content">
      <slot>lcard content/default</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LCard"
};
</script>

<style lang="scss" scoped>
.lcard {
  padding: 16px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(202, 202, 202);
  color: #000;

  .lcard--header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    font-size: 1.5rem;
    font-weight: 300;

    /deep/ i {
      font-size: 1rem;
    }
  }

  .lcard--content {
    > *:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
}
</style>
