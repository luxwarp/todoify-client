<template>
  <transition name="slideInLeft" appear>
    <div v-if="show" class="newUpdateBanner">
      <i class="icon-cancel close" @click="show = false"></i>
      <p>New version available.</p>
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
  bottom: 10px;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: #000;
  color: #fff;
  z-index: 99999;
  padding: 5px 15px;

  > .close {
    margin-right: 15px;
    font-weight: bold;
    color: red;
    cursor: pointer;
  }

  > button {
    padding: 5px;
    background: green;
    color: #fff;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
