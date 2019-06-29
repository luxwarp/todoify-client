<template>
  <div class="container">
    <div class="card">
      <div class="title">Edit user</div>
      <div class="body">
        <form @submit.prevent="onSubmit">
          <input :value="userInfo.name" @input="updateLocalUser($event)" id="name" type="text" placeholder="Name" autofocus />
          <input :value="userInfo.email" @input="updateLocalUser($event)" id="email" type="email" placeholder="Email" required />
          <input :value="userInfo.password" @input="updateLocalUser($event)" id="password" type="password" placeholder="Password" />
          <button class="button primary" type="submit">
            Update user
            <i class="material-icons">
              done
            </i>
          </button>
          <p><a @click="$router.go(-1)">Back</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user.edit',
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
