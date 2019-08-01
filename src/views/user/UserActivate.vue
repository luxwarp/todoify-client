<template>
  <div class="container center">
    <BrandHero />
    <div class="card noFullWidth">
      <div class="title">
        <h2>Activate</h2>
      </div>
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
          <button class="button primary" type="submit">
            Activate account
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

<style lang="scss" scoped></style>
