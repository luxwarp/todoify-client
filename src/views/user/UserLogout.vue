<template>
  <div class="userlogout">
    <l-card>
      <template v-slot:header>
        <span class="label">Logout</span>
        <router-link :to="{ name: 'user.profile' }" title="Abort">
          <i class="icon-cancel"></i>
        </router-link>
      </template>
      <p>You are about to logout.</p>
      <p>
        If you do this, your data will not be available offline until you login
        again.
      </p>
      <div class="buttons">
        <button class="button success" @click="logout(false)">
          <span class="label">Logout</span><i class="icon-logout"></i>
        </button>
        <button class="button alert" @click="logout(true)">
          Logout all devices
        </button>
      </div>
    </l-card>
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
.userlogout {
  width: 100%;
  max-width: 800px;
  margin: auto;

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
