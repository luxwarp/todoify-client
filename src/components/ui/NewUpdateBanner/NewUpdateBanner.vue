<template>
  <transition name="slideInBottom" appear>
    <div v-if="show" class="newUpdateBanner">
      <button class="close" @click="$emit('close')">
        <i class="icon-cancel"></i>
      </button>
      <div>
        <p>
          New version available. <br />
          <a
            href="https://github.com/luxwarp/todoify-client/wiki"
            target="_blank"
            rel="noreferrer"
          >
            Latest changes
          </a>
        </p>
      </div>
      <button class="button" @click="$emit('confirm')">
        Update
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NewUpdateBanner",
  data() {
    return {
      show: true
    };
  }
};
</script>

<style lang="scss" scoped>
.newUpdateBanner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.308);
  padding: 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  color: #000;
  z-index: 99999999;

  > .close {
    margin-right: 15px;
    font-weight: bold;
    color: red;
    cursor: pointer;
    background: none;
    padding: 0;
  }

  > button {
    padding: 5px;
    background: green;
    color: #fff;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    border: 0;
    margin-bottom: 0;
  }
}

.slideInBottom-enter-active {
  animation: slideInBottom 0.3s;
}

.slideInBottom-leave-active {
  animation: slideInBottom 0.3s reverse;
}

@keyframes slideInBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
</style>
