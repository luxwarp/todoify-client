<template>
  <div class="container center">
    <div class="hero">
      <div class="title">Todoify</div>
      <div class="subTitle">Organize and take control over your life</div>
    </div>
    <div class="container">
      <div class="row space-evenly">
        <router-link :to="{ name: 'user.register' }">Sign up</router-link>
        <router-link :to="{ name: 'user.login' }">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>

<style lang="scss"></style>
