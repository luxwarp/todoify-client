<template>
  <div class="app">
    <RequestStatus />
    <Header />
    <div class="mainView">
      <Notifier />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Notifier from '@/components/notifier/Notifier'
import RequestStatus from '@/components/requestStatus/RequestStatus'
export default {
  name: 'app',
  components: {
    Header,
    Notifier,
    RequestStatus
  },
  methods: {
    showMainMenu (event) {
      if (window.screen.width > 1024) {
        this.$store.commit('showMainNav')
      } else {
        this.$store.commit('hideMainNav')
      }
    }
  },
  beforeMount () {
    if (this.$store.getters.isAuth()) {
      this.$store.dispatch('syncWithServer')
    }
  },
  mounted () {
    window.addEventListener('resize', this.showMainMenu)
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .mainView {
    display: flex;
    flex-direction: column;
    background: $mainViewBgColor;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 70px;
  }
}

@media screen and (min-width: 1025px) {
  .app {
    flex-direction: row;

    .mainView {
      margin-top: 0;
    }
  }
}
</style>
