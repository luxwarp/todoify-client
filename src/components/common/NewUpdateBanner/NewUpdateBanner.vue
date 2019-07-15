<template>
  <div v-if="show" class="newUpdateBanner">
    <span class="close" @click="show = false">X</span>
    <p>New version available.</p>
    <button class="button" @click="$emit('confirm')">
      Update
    </button>
  </div>
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
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: #000;
  color: #fff;
  z-index: 99999;
  padding: 0px 15px;

  > .close {
    margin-right: 15px;
    font-weight: bold;
    color: red;
  }

  > button {
    padding: 5px;
    background: green;
    color: #fff;
    border-radius: 5px;
    margin-left: 10px;
  }
}
</style>
