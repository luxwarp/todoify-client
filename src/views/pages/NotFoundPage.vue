<template>
  <div class="notFoundPage">
    <div class="notFoundPage--hero">
      <h1 class="notFoundPage--hero--title">404 - Not Found</h1>
      <h2 class="notFoundPage--hero--subTitle">
        Sorry! Something went wrong. Could not find anything here.
      </h2>

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
  text-align: center;

  > .notFoundPage--hero {
    text-align: center;
    width: 100%;
    padding: 25px;

    > .notFoundPage--hero--title {
      font-size: 3rem;
      font-weight: 300;
      margin-bottom: 25px;
    }

    > .notFoundPage--hero--subTitle {
      font-size: 1.7rem;
      font-weight: 300;
      font-style: italic;
    }

    > button {
      margin: 0 auto;
    }
  }
}
</style>
