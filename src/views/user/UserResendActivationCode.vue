<template>
  <div class="userresendactivationcode">
    <BrandHero />
    <l-card>
      <template v-slot:header>
        <span class="label">Resend Activation Code</span>
      </template>

      <p>
        Enter your email adress to request a new activation code for your
        account.
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
            <span class="label">Request code</span>
            <i class="icon-key"></i>
          </button>
          <router-link :to="{ name: 'user.activate' }">Back</router-link>
        </div>
      </form>
    </l-card>
  </div>
</template>

<script>
export default {
  name: "UserResendActivationCode",
  data() {
    return {
      email: null
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("resendActivationCode", this.email);
    }
  }
};
</script>

<style lang="scss" scoped>
.userresendactivationcode {
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
