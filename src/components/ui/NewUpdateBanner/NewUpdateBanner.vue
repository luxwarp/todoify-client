<template>
  <transition name="slideInBottom" appear>
    <div class="newUpdateBanner">
      <l-button design="noStyle" class="close" @click="$emit('close')">
        <i class="icon-cancel"></i>
      </l-button>
      <div>
        <p>
          A new version is available. <br />
          <a
            href="https://github.com/codeiolo/todoify-client/wiki"
            target="_blank"
            rel="noreferrer"
          >
            Latest changes
          </a>
        </p>
      </div>
      <l-button design="success" @click="$emit('confirm')">
        <span class="label">Update</span>
        <i class="icon-ok" />
      </l-button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NewUpdateBanner"
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
  grid-gap: 16px;
  color: #000;
  z-index: 99999999;

  > .close {
    color: red;
  }
}

.slideInBottom-enter-active {
  animation: slideInBottom 0.3s forwards;
}

.slideInBottom-leave-active {
  animation: slideInBottom 0.3s reverse forwards;
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
