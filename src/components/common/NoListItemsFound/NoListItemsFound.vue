<template>
  <div class="noListItemsFound">
    <span class="title">
      <slot name="title">
        title slot
      </slot>
    </span>
    <p class="subtitle">
      <slot name="subtitle">
        subtitle slot
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "NoListItemsFound"
};
</script>

<style lang="scss">
.noListItemsFound {
  text-align: center;
  margin: 25px;

  > .title {
    font-size: 2rem;
    font-weight: 300;
  }
}
</style>
