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

<style lang="scss"></style>
