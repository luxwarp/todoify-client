<template>
  <div class="container center">
    <div class="card">
      <h2 class="title">Delete user</h2>
      <div class="body">
        <p>This process is permanent and you cannot restore your account.</p>
        <p>Are you sure you want to delete your user account?</p>
        <a v-if="!confirm" @click="confirm = !confirm" class="link alert">Yes I'm sure</a>
        <form v-else autocomplete="off" @submit.prevent="onSubmit">
          <input type="password" v-model="password" placeholder="Current password" required v-focus autocomplete="current-password" />
          <button type="submit" class="button alert">Delete account</button>
        </form>
        <router-link :to="{ name: 'user.profile' }" class="link" style="float: right;">Back</router-link>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDelete',
  data () {
    return {
      password: '',
      confirm: false
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('deleteUser', this.password)
    }
  }
}
</script>

<style lang="scss">

</style>
