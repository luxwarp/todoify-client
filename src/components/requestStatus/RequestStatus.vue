<template>
  <transition name="slide">
  <div class="requestStatus" v-if="getRequestStatus">
    <div class="loader"></div>
    Talking to server
  </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'requestStatus',
  computed: {
    ...mapGetters([
      'getRequestStatus'
    ])
  }
}
</script>

<style lang="scss" scoped>
.requestStatus {
  position: fixed;
  bottom: 10px;
  right: 0;
  z-index: 999;
  border-radius: 5px 0 0 5px;
  border: 0px solid #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background: $requestStatusBgColor;

  .loader {
    margin-right: 10px;
    border:  $requestLoaderBorder;
    border-top: $requestLoaderBorderTop;
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}

</style>
