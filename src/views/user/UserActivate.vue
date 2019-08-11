<template>
  <div class="useractivate">
    <BrandHero />
    <l-card>
      <template v-slot:header>
        <span class="label">Activate</span>
      </template>
      <template v-slot:default>
        <p>
          Enter your activation code you recived in your email.
        </p>
        <form autocomplete="off" @submit.prevent="onSubmit">
          <input
            v-model="activationCode"
            v-focus
            type="text"
            placeholder="Activation code"
            name="activationCode"
            required
            autocomplete="off"
          />
          <div class="buttons">
            <button class="button primary" type="submit">
              <span class="label">Activate</span>
              <i class="icon-key"></i>
            </button>
            <router-link :to="{ name: 'user.resendActivationCode' }"
              >Resend activation code</router-link
            >
          </div>
        </form>
      </template>
    </l-card>
  </div>
</template>

<script>
export default {
  name: "UserActivate",

  data() {
    return {
      activationCode: null
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("activateUser", this.activationCode);
      this.activationCode = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.useractivate {
  max-width: 800px;
  width: 100%;
  margin: auto;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
