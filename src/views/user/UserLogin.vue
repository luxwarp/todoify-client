<template>
  <div class="container center">
    <BrandHero />
    <div class="card noFullWidth hcenter">
      <h2 class="title">
        <span class="label">Login</span>
      </h2>
      <div class="body">
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
          <div class="row">
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
      </div>
    </div>
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
.row {
  justify-content: space-between;
  align-items: center;

  > * {
    margin-bottom: 0;
  }
}
</style>
