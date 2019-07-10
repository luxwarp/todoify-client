<template>
  <div class="container center">
    <div class="card">
      <h2 class="title">Profile</h2>
      <div class="body">
        <p>{{ userInfo.name }}</p>
        <p>{{ userInfo.email }}</p>
        <p>{{ userInfo.createdAt }}</p>
        <router-link :to="{ name: 'user.edit' }">Edit user</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserProfile",
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo"
    })
  }
};
</script>

<style lang="scss"></style>
