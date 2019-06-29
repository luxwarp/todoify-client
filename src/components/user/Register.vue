<template>
  <div class="container">
    <div class="card">
      <h2 class="title">Register</h2>
      <div class="body">
        <form @submit.prevent="onSubmit">
          <input v-model="email" type="email" placeholder="Email" required autofocus />
          <input v-model="password" type="password" placeholder="Password" required />
          <button class="button primary" type="submit" :disabled="isButtonDisable">
            Register
            <i class="material-icons">
              add_circle_outline
            </i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
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
      this.$store.dispatch('register', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {

  margin: auto 0;
  .card {
    width: 90%;
    max-width: 500px;
    align-self: center;
  }
}

</style>
