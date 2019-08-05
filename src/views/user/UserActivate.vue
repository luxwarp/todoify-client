<template>
  <div class="container center">
    <BrandHero />
    <div class="card noFullWidth hcenter">
      <h2 class="title">
        <span class="label">Activate</span>
      </h2>
      <div class="body">
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
          <div class="row">
            <button class="button primary" type="submit">
              <span class="label">Activate</span>
              <i class="icon-key"></i>
            </button>
            <router-link :to="{ name: 'user.resendActivationCode' }"
              >Resend activation code</router-link
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
  name: "UserActivate",
  components: {
    BrandHero
  },
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
.row {
  justify-content: space-between;
  align-items: center;

  > * {
    margin-bottom: 0;
  }
}
</style>
