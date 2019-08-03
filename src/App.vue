<template>
  <transition name="fadeIn" appear>
    <div class="app">
      <NewUpdateBanner v-if="showNewUpdateBanner" @confirm="updateSW" />
      <HeaderContainer />
      <div class="mainView">
        <NotifiersList />
        <div class="mainRouterView">
          <transition name="fadeIn" mode="out-in">
            <router-view :key="$route.path"></router-view>
          </transition>
        </div>
      </div>
      <BottomNav />
      <AddNewShortcuts />
    </div>
  </transition>
</template>

<script>
import HeaderContainer from "@/components/layout/HeaderContainer/HeaderContainer";
import AddNewShortcuts from "@/components/layout/AddNewShortcuts/AddNewShortCuts";
import BottomNav from "@/components/layout/BottomNav/BottomNav";
const NotifiersList = () =>
  import(/* webpackChunkName: "group-banners" */ "@/components/ui/NotifiersList/NotifiersList");
const NewUpdateBanner = () =>
  import(/* webpackChunkName: "group-banners" */ "@/components/ui/NewUpdateBanner/NewUpdateBanner");
export default {
  name: "App",
  components: {
    HeaderContainer,
    NotifiersList,
    NewUpdateBanner,
    BottomNav,
    AddNewShortcuts
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
  width: 100%;
  max-width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  > .mainView {
    background: $mainViewBgColor;
    width: 100%;
    height: 100%;
    max-height: 100%;
    padding-top: 70px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;

    > .mainRouterView {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-height: 100%;
      padding: 0 15px;
      overflow: auto;
    }
  }
}

@media screen and (min-width: 1025px) {
  .app {
    flex-direction: row;

    > .mainView {
      padding-top: 0;
      padding-bottom: 10px;
    }
  }
}
</style>
