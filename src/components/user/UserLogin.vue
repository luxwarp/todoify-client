<template>
  <div class="container center">
    <div class="card">
      <h2 class="title">Login</h2>
      <div class="body">
        <form @submit.prevent="onSubmit" autocomplete="on">
          <input v-model="email" type="email" placeholder="Email" name="email" required v-focus autocomplete="email" />
          <input v-model="password" type="password" placeholder="Password" name="current-password" required autocomplete="current-password" />
          <button class="button primary" type="submit" :disabled="isButtonDisable">
            Login
            <i class="material-icons">
              lock_open
            </i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      email: null,
      password: null
    }
  },
  computed: {
    isButtonDisable () {
      return !(this.email && this.password)
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="scss">

</style>
