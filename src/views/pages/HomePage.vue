<template>
  <div class="container center">
    <div class="hero">
      <div class="title">
        <div class="brandLogo"></div>
        Todoify
      </div>
      <div class="subTitle">Organize and take control over your life</div>
    </div>
    <div class="container">
      <div v-if="isOnline() && !isAuth()" class="row space-evenly">
        <router-link
          :to="{ name: 'user.register' }"
          class="button primary"
          tag="button"
          >Sign up <i class="fas fa-user-plus"></i
        ></router-link>
        <router-link
          :to="{ name: 'user.login' }"
          class="button success"
          tag="button"
          >Sign in <i class="fas fa-sign-in-alt"></i
        ></router-link>
      </div>
      <div v-else-if="isOnline() && isAuth()" class="text-center">
        <p>
          Logged in as:
          <router-link :to="{ name: 'user.profile' }">{{
            user.name || user.email
          }}</router-link>
        </p>
      </div>
      <div v-else class="container text-center">
        <p>
          You don't have an internet connection. You can continue using Todoify
          while offline and later on sync your data to our server if you have an
          account.
        </p>
        <router-link :to="{ name: 'about.page' }">Read more</router-link>
      </div>
      <div class="container text-center">
        <p style="color: red">
          This app is still in development stage. Changes may occur on a daily
          basis.
        </p>
        <p>
          <router-link :to="{ name: 'about.page' }">Read more</router-link> if
          you want to help us.
        </p>
      </div>
    </div>
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

<style lang="scss"></style>
