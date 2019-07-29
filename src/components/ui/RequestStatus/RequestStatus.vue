<template>
  <transition name="fadeIn">
    <div
      v-if="getRequestStatus"
      class="requestStatus"
      @click="showText = !showText"
    >
      <div class="loader"></div>
      <transition name="fadeIn">
        <span v-if="showText" class="label">Talking to server</span>
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
  position: relative;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  cursor: pointer;

  .loader {
    border: 2px solid #f3f3f3; /* Light grey */
    border-top: 2px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
  }

  .label {
    margin-left: 10px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .slideInLeft-enter-active {
    animation: slideInLeft 0.5s ease-in;
  }

  .slideInLeft-leave-active {
    animation: slideInLeft 0.5s reverse ease-out;
  }
}
</style>
