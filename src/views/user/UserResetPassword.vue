<template>
  <div class="container center">
    <BrandHero />
    <div class="card noFullWidth">
      <div class="title">
        <h2>Reset password</h2>
      </div>
      <div class="body">
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
          <button class="button primary" type="submit">
            Reset password
            <i class="icon-key"></i>
          </button>
        </form>
        <router-link :to="{ name: 'user.login' }">Back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BrandHero from "@/components/ui/BrandHero/BrandHero";
export default {
  name: "UserResetPassword",
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
      this.$store.dispatch("resetPassword", this.email);
      this.email = null;
    }
  }
};
</script>

<style lang="scss" scoped></style>
