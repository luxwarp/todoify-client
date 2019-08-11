<template>
  <div class="useredit">
    <l-card>
      <template v-slot:header>
        <span class="label">Edit user</span>
        <button class="button noStyle" @click="$router.go(-1)">
          <i class="icon-cancel"></i>
        </button>
      </template>
      <form autocomplete="off" @submit.prevent="onSubmit">
        <input
          id="name"
          v-focus
          :value="userInfo.name"
          type="text"
          placeholder="Name"
          name="new-name"
          autocomplete="off"
          @input="updateLocalUser($event)"
        />
        <input
          id="email"
          :value="userInfo.email"
          type="email"
          placeholder="Email"
          name="new-email"
          required
          autocomplete="off"
          @input="updateLocalUser($event)"
        />
        <input
          id="newPassword"
          type="password"
          name="new-password"
          placeholder="New password"
          autocomplete="new-password"
          @input="updateLocalUser($event)"
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Current password"
          required
          autocomplete="current-password"
          @input="updateLocalUser($event)"
        />
        <div class="buttons">
          <button class="button primary" type="submit">
            <span class="label">Update user</span>
            <i class="icon-ok"></i>
          </button>

          <router-link
            :to="{ name: 'user.delete' }"
            class="link alert"
            style="float: right;"
            >Delete user</router-link
          >
        </div>
      </form>
    </l-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserEdit",
  data() {
    return {
      user: {}
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo"
    })
  },
  methods: {
    updateLocalUser(e) {
      this.$set(this.user, e.target.id, e.target.value);
    },
    onSubmit() {
      if (this.user.name && !this.user.name.trim()) {
        this.user.name = null;
      }
      if (this.user.password && !this.user.password.trim()) {
        delete this.user.password;
      }
      this.$store.dispatch("updateUser", this.user);
    }
  }
};
</script>

<style lang="scss" scoped>
.useredit {
  width: 100%;
  max-width: 800px;
  margin: auto;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    > * {
      margin-bottom: 0px;
    }
  }
}
</style>
