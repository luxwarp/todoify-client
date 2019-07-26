<template>
  <div class="app">
    <NewUpdateBanner v-if="showNewUpdateBanner" @confirm="updateSW" />
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
import HeaderContainer from "@/components/layout/HeaderContainer/HeaderContainer";
const NotifiersList = () =>
  import(/* webpackChunkName: "group-banners" */ "@/components/ui/NotifiersList/NotifiersList");
const RequestStatus = () =>
  import(/* webpackChunkName: "group-banners" */ "@/components/ui/RequestStatus/RequestStatus");
const NewUpdateBanner = () =>
  import(/* webpackChunkName: "group-banners" */ "@/components/ui/NewUpdateBanner/NewUpdateBanner");
export default {
  name: "App",
  components: {
    HeaderContainer,
    NotifiersList,
    RequestStatus,
    NewUpdateBanner
  },
  data() {
    return {
      showNewUpdateBanner: false,
      updating: false,
      registration: null
    };
  },
  created() {
    window.addEventListener("offline", () => {
      this.$store.dispatch("handleOffline");
    });
    window.addEventListener("online", () => {
      this.$store.dispatch("handleOnline");
    });
    window.addEventListener("resize", this.showMainMenu);

    document.addEventListener("swUpdated", this.activateUpdateBanner, {
      once: true
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.updating) return;
      this.updating = true;
      window.location.reload();
    });
  },
  beforeMount() {
    if (this.$store.getters.isOnline()) {
      this.$store.dispatch("handleOnline");
    } else {
      this.$store.dispatch("handleOffline");
    }
  },
  methods: {
    showMainMenu() {
      if (window.innerWidth > 1024) {
        this.$store.commit("showMainNav");
      } else {
        this.$store.commit("hideMainNav");
      }
    },
    updateSW() {
      this.showNewUpdateBanner = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
    activateUpdateBanner(e) {
      this.showNewUpdateBanner = true;
      this.registration = e.detail;
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
