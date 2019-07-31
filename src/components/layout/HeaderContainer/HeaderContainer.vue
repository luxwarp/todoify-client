<template>
  <div class="header">
    <div class="banner">
      <router-link :to="{ name: 'home.page' }" class="brand">
        Todoify</router-link
      >
      <RequestStatus />
      <div class="menuButton" @click="toggleMainNav">
        <i :class="showMainNav ? 'icon-cancel' : 'icon-menu'"></i>
      </div>
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

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 70px;
  max-height: 100vh;
  color: $headerFontColor;
  display: flex;
  flex-direction: column;

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
    padding: 15px;

    .brand {
      font-weight: 300;
      font-size: 1.5rem;
      font-weight: 300;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
    }

    .menuButton {
      cursor: pointer;
      background: inherit;
      margin-left: 10px;
    }
  }
}

@media screen and (min-width: 1025px) {
  .header {
    position: static;
    min-width: 350px;
    max-width: 350px;
    height: 100vh;
    background: $headerBgColor;

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
