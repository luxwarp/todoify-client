<template>
  <div class="brandHero">
    <div class="title">
      <img
        src="~@/assets/images/todoify/android-chrome-192x192.png"
        alt="todoify-logo"
        class="brandLogo"
      />
      <span class="label">Todoify</span>
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
  width: 100%;
  margin: 25px 0;
  text-align: center;

  > .title {
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    > .brandLogo {
      width: 50px;
      height: 50px;
    }

    > .label {
      padding: 0 10px;
    }
  }

  > .subTitle {
    font-size: 1.7rem;
    font-weight: 300;
    font-style: italic;
  }
}
</style>
