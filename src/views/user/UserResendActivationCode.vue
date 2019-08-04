<template>
  <div class="container center">
    <BrandHero />
    <div class="card noFullWidth hcenter">
      <div class="title">
        <h2>Resend Activation Code</h2>
      </div>
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
          <button class="button primary" type="submit">
            <span class="label">Resend activation code</span>
            <i class="icon-key"></i>
          </button>
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
      // this.$store.dispatch("resendActivationCode", {
      //   email: this.email
      // });
    }
  }
};
</script>
