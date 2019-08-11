<template>
  <div class="noListItemsFound">
    <h1 class=".noListItemFound--title">
      <slot name="title">
        title slot
      </slot>
    </h1>
    <p class=".noListItemFound--subtitle">
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

<style lang="scss" scoped>
.noListItemsFound {
  text-align: center;
  margin: 25px;

  > .noListItemFound--title {
    font-size: 2rem;
    font-weight: 300;
  }

  > .noListItemFound--subtitle {
  }
}
</style>
