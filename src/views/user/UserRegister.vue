<template>
  <div class="userregister">
    <BrandHero />
    <l-card>
      <template v-slot:header>
        <span class="label">Register</span>
      </template>
      <template v-slot:default>
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
          <div class="buttons">
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
      </template>
    </l-card>
  </div>
</template>

<script>
export default {
  name: "UserRegister",
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
.userregister {
  width: 800px;
  max-width: 100%;
  margin: auto auto;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
