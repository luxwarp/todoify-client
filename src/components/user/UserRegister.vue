<template>
  <div class="container center">
    <div class="card">
      <h2 class="title">Register</h2>
      <div class="body">
        <form @submit.prevent="onSubmit" autocomplete="off">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            name="email"
            required
            v-focus
            autocomplete="off"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            name="password"
            required
            autocomplete="new-password"
          />
          <button
            class="button primary"
            type="submit"
            :disabled="isButtonDisable"
          >
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
  name: 'UserRegister',
  data() {
    return {
      email: null,
      password: null
    }
  },
  computed: {
    isButtonDisable() {
      return !(this.email && this.password)
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss"></style>
