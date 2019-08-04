<template>
  <div class="container center">
    <div class="card noFullWidth hcenter">
      <div class="title">
        <h2>Logout</h2>
        <router-link :to="{ name: 'user.profile' }" title="Abort">
          <i class="icon-cancel"></i>
        </router-link>
      </div>
      <div class="body">
        <p>You are about to logout.</p>
        <p>
          If you do this, your data will not be available offline until you
          login again.
        </p>
        <div class="row">
          <button class="button success" @click="logout(false)">
            <span class="label">Logout</span><i class="icon-logout"></i>
          </button>
          <span class="link alert" @click="logout(true)">
            Logout all devices
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLogout",
  methods: {
    logout(allDevices) {
      this.$store.dispatch("logout", allDevices);
    }
  }
};
</script>

<style lang="scss">
.row {
  justify-content: space-between;
  align-items: center;
}
</style>
