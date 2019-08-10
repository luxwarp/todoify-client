<template>
  <div class="userlogin">
    <BrandHero />
    <l-card>
      <template v-slot:header>
        <span class="label">Login</span>
      </template>
      <template v-slot:default>
        <form autocomplete="on" @submit.prevent="onSubmit">
          <input
            v-model="email"
            v-focus
            type="email"
            placeholder="Email"
            name="email"
            required
            autocomplete="email"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            name="current-password"
            required
            autocomplete="current-password"
          />
          <div class="buttons">
            <button
              class="button primary"
              type="submit"
              :disabled="isButtonDisable"
            >
              <span class="label">Login</span>
              <i class="icon-login"></i>
            </button>
            <router-link :to="{ name: 'user.reset' }"
              >Reset password</router-link
            >
          </div>
        </form>
      </template>
    </l-card>
  </div>
</template>

<script>
import BrandHero from "@/components/ui/BrandHero/BrandHero";
export default {
  name: "UserLogin",
  components: {
    BrandHero
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  computed: {
    isButtonDisable() {
      return !(this.email && this.password);
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.userlogin {
  width: 800px;
  max-width: 100%;
  margin: auto auto;
  text-align: center;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
