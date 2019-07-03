<template>
  <div class="container center">
    <div class="card">
      <h2 class="title">Edit user</h2>
      <div class="body">
        <form @submit.prevent="onSubmit">
          <input :value="userInfo.name" @input="updateLocalUser($event)" id="name" type="text" placeholder="Name" v-focus />
          <input :value="userInfo.email" @input="updateLocalUser($event)" id="email" type="email" placeholder="Email" required />
          <input :value="userInfo.password" @input="updateLocalUser($event)" id="password" type="password" placeholder="Password" />
          <button class="button primary" type="submit">
            Update user
            <i class="material-icons">
              done
            </i>
          </button>
        </form>
        <a @click="$router.go(-1)">Back</a>
        <router-link :to="{ name: 'user.delete' }" class="link alert" style="float: right;">Delete user</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserEdit',
  data () {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    updateLocalUser (e) {
      this.$set(this.user, e.target.id, e.target.value)
    },
    onSubmit () {
      this.$store.dispatch('updateUser', this.user)
    }
  }
}
</script>

<style lang="scss">

</style>
