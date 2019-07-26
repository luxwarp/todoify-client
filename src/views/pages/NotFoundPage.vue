<template>
  <div class="container center">
    <div class="hero">
      <div class="title">404 - Not Found</div>
      <div class="subTitle">
        Sorry! Something went wrong. Could not find anything here.
      </div>
    </div>
    <div class="container text-center">
      <a @click="$router.go(-1)">Go back</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage"
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 25px;

  > .title {
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }

  > .subTitle {
    font-size: 1.7rem;
    font-weight: 300;
    font-style: italic;
  }
}
</style>
