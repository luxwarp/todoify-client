<template>
  <div class="notFoundPage">
    <div class="hero">
      <h1 class="title">404 - Not Found</h1>
      <h2 class="subTitle">
        Sorry! Something went wrong. Could not find anything here.
      </h2>
    </div>
    <div class="container text-center">
      <button class="button primary" @click="$router.go(-1)">
        <span class="label">Go back</span>
        <i class="icon-left"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage"
};
</script>

<style lang="scss" scoped>
.notFoundPage {
  width: 100%;
  margin: auto 0;

  .hero {
    text-align: center;
    width: 100%;
    padding: 25px;

    > .title {
      font-size: 3rem;
      font-weight: 300;
      margin-bottom: 25px;
    }

    > .subTitle {
      font-size: 1.7rem;
      font-weight: 300;
      font-style: italic;
    }
  }
}
</style>
