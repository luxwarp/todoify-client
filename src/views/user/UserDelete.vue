<template>
  <div class="container center">
    <div class="card noFullWidth hcenter">
      <h2 class="title">
        <span class="label">Delete user</span>
        <router-link :to="{ name: 'user.profile' }"
          ><i class="icon-cancel"></i
        ></router-link>
      </h2>
      <div class="body">
        <p>This process is permanent and you cannot restore your account.</p>
        <p>Are you sure you want to delete your user account?</p>
        <button
          v-if="!confirm"
          class="button alert"
          @click="confirm = !confirm"
        >
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
      </div>
    </div>
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
.row {
  justify-content: space-between;
  align-items: center;

  > * {
    margin-bottom: 0;
  }
}
</style>
