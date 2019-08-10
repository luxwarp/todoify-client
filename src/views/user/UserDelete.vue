<template>
  <div class="userdelete">
    <l-card>
      <template v-slot:header>
        <span class="label">Delete user</span>
        <router-link :to="{ name: 'user.profile' }"
          ><i class="icon-cancel"></i
        ></router-link>
      </template>
      <p>This process is permanent and you cannot restore your account.</p>
      <p>Are you sure you want to delete your user account?</p>
      <button v-if="!confirm" class="button alert" @click="confirm = !confirm">
        Yes I'm sure
      </button>
      <form v-else autocomplete="off" @submit.prevent="onSubmit">
        <input
          v-model="password"
          v-focus
          type="password"
          placeholder="Current password"
          required
          autocomplete="off"
        />

        <button type="submit" class="button alert">
          <span class="label">Delete account</span> <i class="icon-ok"></i>
        </button>
      </form>
    </l-card>
  </div>
</template>

<script>
export default {
  name: "UserDelete",
  data() {
    return {
      password: "",
      confirm: false
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("deleteUser", this.password);
    }
  }
};
</script>

<style lang="scss" scoped>
.userdelete {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
</style>
