<template>
  <div class="HomePage">
    <BrandHero />
    <div v-if="isOnline() && !isAuth()" class="buttons">
      <l-button :to="{ name: 'user.register' }" design="primary">
        <span class="label">Register</span>
        <i class="icon-user-plus"></i>
      </l-button>
      <l-button :to="{ name: 'user.login' }" design="success">
        <span class="label">Login</span>
        <i class="icon-login"></i>
      </l-button>
    </div>

    <p v-else-if="isOnline() && isAuth()">
      Logged in as:
      <router-link :to="{ name: 'user.profile' }">
        {{ user.name || user.email }}
      </router-link>
    </p>

    <p v-else>
      You don't have an internet connection. You can continue using Todoify
      while offline and later on sync your data to our server if you have an
      account.
      <router-link :to="{ name: 'about.page' }">Read more</router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomePage",
  computed: {
    ...mapGetters({
      isOnline: "isOnline",
      isAuth: "isAuth",
      user: "getUserInfo"
    })
  }
};
</script>

<style lang="scss" scoped>
.HomePage {
  margin: auto auto;
  text-align: center;
  max-width: 800px;

  .buttons {
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
    > a {
      margin-bottom: 10px;
    }
  }
}
</style>
