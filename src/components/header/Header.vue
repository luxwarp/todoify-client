<template>
    <div class="header">
      <div class="banner">
        <router-link :to="{name: 'home'}" tag="div" class="brand">Todoify</router-link>
        <div class="menuButton" @click="toggleMainNav">
          <i class="material-icons md-36">
            menu
          </i>
        </div>
      </div>
      <MainNav />
    </div>
</template>

<script>
import MainNav from './MainNav'
export default {
  name: 'HeaderContainer',
  components: {
    MainNav
  },
  methods: {
    toggleMainNav () {
      this.$store.commit('toggleMainNav')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 70px;
  max-height: 100vh;
  color: $headerFontColor;
  display: flex;
  flex-direction: column;
  z-index: 10;
  transition: all 0.5s ease-in-out;

  .banner {
    position: sticky;
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    background: $headerBgColor;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 20;
    padding: 15px;

    .brand {
      font-weight: 300;
      font-size: 1.5rem;
      font-weight: 300;
      letter-spacing: 1px;
      cursor: pointer;
    }

    .menuButton {
      cursor: pointer;
    }
  }
}

@media screen and (min-width: 1025px) {
  .header {
    position: relative;
    width: 400px;
    height: 100vh;
    background: $headerBgColor;

    .banner {
      justify-content: center;

      .brand {
        font-size: 2rem;
      }

      .menuButton {
        display: none;
      }
    }
  }
}

</style>
