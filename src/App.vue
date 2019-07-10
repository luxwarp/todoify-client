<template>
  <div class="app">
    <RequestStatus />
    <HeaderContainer />
    <div class="mainView">
      <NotifiersList />
      <div class="mainRouterView">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderContainer from "@/components/header/HeaderContainer";
import NotifiersList from "@/components/notifiers/NotifiersList";
import RequestStatus from "@/components/requestStatus/RequestStatus";
export default {
  name: "App",
  components: {
    HeaderContainer,
    NotifiersList,
    RequestStatus
  },
  created() {
    if (this.$store.getters.isAuth()) {
      this.$store.dispatch("syncWithServer");
    }
  },
  mounted() {
    window.addEventListener("resize", this.showMainMenu);
  },
  methods: {
    showMainMenu(event) {
      if (window.screen.width > 1024) {
        this.$store.commit("showMainNav");
      } else {
        this.$store.commit("hideMainNav");
      }
    }
  }
};
</script>

<style lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  > .mainView {
    position: relative;
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

    > .mainRouterView {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0 15px;
    }
  }
}

@media screen and (min-width: 1025px) {
  .app {
    flex-direction: row;

    > .mainView {
      margin-top: 0;
    }
  }
}
</style>
