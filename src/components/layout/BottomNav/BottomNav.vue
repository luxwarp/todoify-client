<template>
  <ul class="bottomNav">
    <li class="navItem">
      <router-link :to="{ name: 'todos.list' }" title="To-do's">
        <i class="icon-list"></i>
      </router-link>
    </li>
    <li class="navItem">
      <router-link :to="{ name: 'categories.list' }" title="Categories">
        <i class="icon-folder"></i>
      </router-link>
    </li>
    <li v-if="isOnline() && isAuth()" class="navItem">
      <router-link :to="{ name: 'user.profile' }" title="Profile">
        <i class="icon-user"></i>
      </router-link>
    </li>
    <li v-else-if="isOnline() && !isAuth()" class="navItem">
      <router-link :to="{ name: 'user.login' }" title="Login">
        <i class="icon-login"></i>
      </router-link>
    </li>
    <li v-else class="navItem">
      <router-link :to="{ name: 'home.page' }" title="Home">
        <i class="icon-home"></i>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BottomNav",
  computed: {
    ...mapGetters(["isOnline", "isAuth"])
  }
};
</script>

<style lang="scss">
.bottomNav {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  background: $bottomNavBgColor;
  color: $bottomNavFontColor;
  list-style: none;
  margin: 0;
  padding: 0;

  > .navItem {
    flex: 1;
    text-align: center;
    font-size: 1.2rem;
    display: flex;

    > a {
      flex: 1;
      color: inherit;
      padding: 10px 0;
      transition: all 0.4s ease-in-out;

      &:hover,
      &:focus,
      &.router-link-exact-active {
        background: $bottomNavHoverBgColor;
        border-bottom: 0;
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .bottomNav {
    display: none;
  }
}
</style>
