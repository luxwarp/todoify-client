<template>
  <div class="container">
    <div class="card">
      <div class="title">Profile</div>
      <div class="body">
        <p>{{userInfo.name}}</p>
        <p>{{userInfo.email}}</p>
        <p>{{userInfo.createdAt}}</p>
        <router-link :to="{name: 'user.edit'}">Edit user</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user.profile',
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: auto 0;
  .card {
    width: 90%;
    max-width: 500px;
    align-self: center;
  }
}

</style>
