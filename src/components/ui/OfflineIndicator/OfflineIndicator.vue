<template>
  <div v-if="show" class="OfflineIndicator">
    <slot name="indicator">
      <div class="indicator" :class="light"></div>
      <p class="label">You are offline.</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "OfflineIndicator",
  data() {
    return {
      show: navigator.onLine ? false : true,
      light: "offline"
    };
  },
  created() {
    window.addEventListener("offline", () => {
      this.show = true;
      this.light = "offline";
    });
    window.addEventListener("online", () => {
      this.show = false;
      this.light = "online";
    });
  }
};
</script>

<style lang="scss">
.OfflineIndicator {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: inherit;
  color: inherit;
  padding: 0 15px;

  > .indicator {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin-right: 10px;

    &.offline {
      background: red;
    }

    &.online {
      background: green;
    }
  }
}
</style>
