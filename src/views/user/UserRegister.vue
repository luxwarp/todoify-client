<template>
  <div class="container center">
    <BrandHero />
    <div class="card noFullWidth hcenter">
      <h2 class="title">
        <span class="label">Register</span>
      </h2>
      <div class="body">
        <form autocomplete="off" @submit.prevent="onSubmit">
          <input
            v-model="email"
            v-focus
            type="email"
            placeholder="Email"
            name="email"
            required
            autocomplete="off"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            name="password"
            required
            autocomplete="new-password"
          />
          <div class="row">
            <button
              class="button primary"
              type="submit"
              :disabled="isButtonDisable"
            >
              <span class="label">Register</span>
              <i class="icon-user-plus"></i>
            </button>

            <router-link :to="{ name: 'user.activate' }">
              Activate account
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrandHero from "@/components/ui/BrandHero/BrandHero";
export default {
  name: "UserRegister",
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
      this.$store.dispatch("register", {
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
