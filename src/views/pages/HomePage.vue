<template>
  <div class="HomePage">
    <BrandHero />
    <div v-if="isOnline() && !isAuth()" class="buttons">
      <router-link
        :to="{ name: 'user.register' }"
        class="button primary"
        tag="button"
      >
        <span class="label">Register</span>
        <i class="icon-user-plus"></i>
      </router-link>
      <router-link
        :to="{ name: 'user.login' }"
        class="button success"
        tag="button"
      >
        <span class="label">Login</span>
        <i class="icon-login"></i>
      </router-link>
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
import BrandHero from "@/components/ui/BrandHero/BrandHero.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomePage",
  components: {
    BrandHero
  },
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
  }
}
</style>
