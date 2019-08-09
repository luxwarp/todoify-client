<template>
  <transition name="fadeIn" appear>
    <div class="app">
      <NewUpdateBanner
        v-if="showNewUpdateBanner"
        @confirm="updateSW"
        @close="showNewUpdateBanner = !showNewUpdateBanner"
      />
      <HeaderContainer />
      <div class="mainView">
        <NotifiersList />
        <transition name="fadeIn" mode="out-in">
          <router-view
            :key="$route.path"
            style="padding: 0 16px;"
          ></router-view>
        </transition>
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

<style lang="scss" scoped>
.app {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "bottomNav";
  min-height: 100vh;
  background: #fff;

  > .mainView {
    grid-area: main;
    background: $mainViewBgColor;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (min-width: 1025px) {
  .app {
    grid-template-columns: 300px minmax(0, 1fr);
    grid-template-areas:
      "header main"
      "header main"
      "header main";
  }
}
</style>
