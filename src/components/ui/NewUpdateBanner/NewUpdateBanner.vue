<template>
  <transition name="slideInLeft" appear>
    <div v-if="show" class="newUpdateBanner">
      <button class="close" @click="show = false">
        <i class="icon-cancel"></i>
      </button>
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.829);
  color: #fff;
  z-index: 999999999;
  padding: 5px;

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
</style>
