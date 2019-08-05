<template>
  <div class="container center">
    <BrandHero />
    <div class="card noFullWidth hcenter">
      <div class="title">
        <h2>Resend Activation Code</h2>
      </div>
      <div class="body">
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
          <div class="row">
            <button class="button primary" type="submit">
              <span class="label">Request code</span>
              <i class="icon-key"></i>
            </button>
            <router-link :to="{ name: 'user.activate' }">Back</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrandHero from "@/components/ui/BrandHero/BrandHero";
export default {
  name: "UserResendActivationCode",
  components: {
    BrandHero
  },
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
.row {
  justify-content: space-between;
  align-items: center;

  > * {
    margin-bottom: 0;
  }
}
</style>
