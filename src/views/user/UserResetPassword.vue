<template>
  <div class="userresetpassword">
    <BrandHero />
    <l-card>
      <template v-slot:header>
        <span class="label">Reset password</span>
      </template>

      <p>
        Enter your email, a new password will be generated and sent to your
        email.
      </p>
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
        <div class="buttons">
          <button class="button primary" type="submit">
            <span class="label">Reset password</span>
            <i class="icon-key"></i>
          </button>
          <router-link :to="{ name: 'user.login' }">Back</router-link>
        </div>
      </form>
    </l-card>
  </div>
</template>

<script>
export default {
  name: "UserResetPassword",
  data() {
    return {
      email: null
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("resetPassword", this.email);
      this.email = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.userresetpassword {
  width: 100%;
  max-width: 800px;
  margin: auto;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
