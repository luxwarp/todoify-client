<template>
  <div class="container center">
    <BrandHero />
    <div class="container noFullWidth">
      <div
        v-if="isOnline() && !isAuth()"
        class="row"
        style="justify-content: space-between;"
      >
        <router-link
          :to="{ name: 'user.register' }"
          class="button primary"
          tag="button"
          >Sign up <i class="icon-user-plus"></i
        ></router-link>
        <router-link
          :to="{ name: 'user.login' }"
          class="button success"
          tag="button"
          >Login <i class="icon-login"></i
        ></router-link>
      </div>
      <div v-else-if="isOnline() && isAuth()" class="text-center">
        <p>
          Logged in as:
          <router-link :to="{ name: 'user.profile' }">
            {{ user.name || user.email }}
          </router-link>
        </p>
      </div>
      <div v-else class="text-center">
        <p>
          You don't have an internet connection. You can continue using Todoify
          while offline and later on sync your data to our server if you have an
          account.
        </p>
        <router-link :to="{ name: 'about.page' }">Read more</router-link>
      </div>
    </div>
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
