<template>
  <transition name="slideInLeft">
    <div
      v-if="getRequestStatus"
      class="requestStatus"
      @click="showText = !showText"
    >
      <div class="loader"></div>
      <transition name="slide">
        <span v-if="showText">Talking to server</span>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RequestStatus",
  data() {
    return {
      showText: true
    };
  },
  computed: {
    ...mapGetters(["getRequestStatus"])
  },
  mounted() {
    setTimeout(() => {
      this.showText = false;
    }, 5000);
  }
};
</script>

<style lang="scss" scoped>
.requestStatus {
  position: fixed;
  bottom: 50px;
  right: 0;
  z-index: 999;
  border-radius: 5px 0 0 5px;
  border: 1px solid rgb(167, 167, 167);
  border-right: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: #fff;
  cursor: pointer;

  .loader {
    border: 2px solid #f3f3f3; /* Light grey */
    border-top: 2px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
    margin-right: 10px;
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(0%);
    }
  }

  .slideInLeft-enter-active {
    animation: slideInLeft 0.5s ease-in;
  }

  .slideInLeft-leave-active {
    animation: slideInLeft 0.5s reverse ease-out;
  }
}

@media screen and (min-width: 1025px) {
  .requestStatus {
    bottom: 10px;
  }
}
</style>
