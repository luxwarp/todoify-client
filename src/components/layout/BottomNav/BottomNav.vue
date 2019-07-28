<template>
  <div class="bottomNav">
    <router-link :to="{ name: 'todos.list' }" title="To-do's" class="nav-item">
      <i class="icon-list"></i>
    </router-link>
    <router-link
      :to="{ name: 'categories.list' }"
      title="Categories"
      class="nav-item"
    >
      <i class="icon-folder"></i>
    </router-link>
    <router-link
      v-if="isOnline() && isAuth()"
      :to="{ name: 'user.profile' }"
      title="Profile"
      class="nav-item"
    >
      <i class="icon-user"></i>
    </router-link>
    <router-link
      v-else-if="isOnline() && !isAuth()"
      :to="{ name: 'user.login' }"
      title="Login"
      class="nav-item"
    >
      <i class="icon-login"></i>
    </router-link>
    <router-link
      v-else
      :to="{ name: 'home.page' }"
      title="Home"
      class="nav-item"
    >
      <i class="icon-home"></i>
    </router-link>
  </div>
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

<style lang="scss" scoped>
.bottomNav {
  display: flex;
  flex-direction: row;
  background: $bottomNavBgColor;
  color: $bottomNavFontColor;

  > .nav-item {
    flex: 1;
    padding: 10px 0;
    color: inherit;
    text-align: center;
    font-size: 1.2rem;

    &:hover {
      background: $bottomNavHoverBgColor;
    }

    &.router-link-exact-active {
      background: $bottomNavHoverBgColor;
    }
  }
}

@media screen and (min-width: 1025px) {
  .bottomNav {
    display: none;
  }
}
</style>
