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
import MainNav from "@/components/layout/MainNav/MainNav";
import { mapGetters } from "vuex";
export default {
  name: "HeaderContainer",
  components: {
    MainNav
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
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 2;
  color: $headerFontColor;
  background: $headerBgColor;

  > .banner {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    background: inherit;
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
    max-height: 100vh;
    overflow: auto;
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
