<template>
  <div class="brandHero">
    <div class="title">
      <div class="brandLogo"></div>
      Todoify
    </div>
    <div class="subTitle">Organize and take control over your life</div>
  </div>
</template>

<script>
export default {
  name: "BrandHero"
};
</script>

<style lang="scss" scoped>
.brandHero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 25px;

  > .title {
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }

  > .subTitle {
    font-size: 1.7rem;
    font-weight: 300;
    font-style: italic;
  }
}
</style>
