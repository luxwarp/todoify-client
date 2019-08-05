<template>
  <div class="headerContainer">
    <div class="banner">
      <router-link :to="{ name: 'home.page' }" class="brand">
        Todoify
      </router-link>
      <RequestStatus />
      <i
        class="menuButton"
        :class="showMainNav ? 'icon-cancel' : 'icon-menu'"
        @click="toggleMainNav"
      ></i>
    </div>
    <MainNav>
      <OfflineIndicator
        style="position: sticky; bottom: 0; margin-top: auto;"
      />
    </MainNav>
  </div>
</template>

<script>
import RequestStatus from "@/components/ui/RequestStatus/RequestStatus";
import MainNav from "@/components/layout/MainNav/MainNav";
import OfflineIndicator from "@/components/ui/OfflineIndicator/OfflineIndicator";
import { mapGetters } from "vuex";
export default {
  name: "HeaderContainer",
  components: {
    MainNav,
    OfflineIndicator,
    RequestStatus
  },
  computed: {
    ...mapGetters(["showMainNav"])
  },
  methods: {
    toggleMainNav() {
      this.$store.commit("toggleMainNav");
    }
  }
};
</script>

<style lang="scss" scoped>
.headerContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  color: $headerFontColor;
  z-index: 1;

  > .banner {
    position: relative;
    width: 100%;
    display: flex;
    background: $headerBgColor;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    z-index: 1;

    > .brand {
      font-weight: 300;
      font-size: 1.5rem;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
      z-index: inherit;
    }

    > .menuButton {
      cursor: pointer;
      background: inherit;
      margin-left: 10px;
      z-index: inherit;
    }
  }
}

@media screen and (min-width: 1025px) {
  .headerContainer {
    position: relative;
    min-width: 350px;
    max-width: 350px;
    height: 100vh;
    max-height: 100vh;
    background: $headerBgColor;
    border: 1px solid purple;
    z-index: 0;

    .banner {
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
