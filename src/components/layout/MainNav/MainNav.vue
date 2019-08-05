<template>
  <transition name="slideInTop">
    <div v-if="showMainNav" class="mainNav">
      <h2 v-if="categories.length" class="title">
        Categories
      </h2>
      <ul v-if="categories.length" class="categories" @click="toggleMainNav">
        <li v-for="category in categories" :key="category._id" class="navItem">
          <router-link
            :to="{
              name: 'categories.item',
              params: { categoryId: category._id }
            }"
          >
            <i class="icon-folder"></i>
            <span class="label">{{ category.title }}</span>
            <div class="badge">
              {{ getTodosByCategoryId(category._id).length }}
            </div>
          </router-link>
        </li>
      </ul>
      <h2 class="title">Menu</h2>
      <ul class="pages" @click="toggleMainNav">
        <li class="navItem">
          <router-link :to="{ name: 'home.page' }">
            <i class="icon-home"></i>
            <span class="label">Home</span>
          </router-link>
        </li>
        <li class="navItem">
          <router-link :to="{ name: 'categories.list' }">
            <i class="icon-folder-open"></i>
            <span class="label">Categories</span>
          </router-link>
        </li>
        <li class="navItem">
          <router-link :to="{ name: 'todos.list' }">
            <i class="icon-list"></i>
            <span class="label">To-do's</span>
          </router-link>
        </li>
        <li v-if="isOnline() && !isAuth()" class="navItem">
          <router-link :to="{ name: 'user.login' }">
            <i class="icon-login"></i>
            <span class="label">Login</span>
          </router-link>
        </li>
        <li v-if="isOnline() && !isAuth()" class="navItem">
          <router-link :to="{ name: 'user.register' }">
            <i class="icon-user-plus"></i>
            <span class="label">Register</span>
          </router-link>
        </li>
        <li v-if="isOnline() && isAuth()" class="navItem">
          <router-link :to="{ name: 'user.profile' }">
            <i class="icon-user"></i>
            <span class="label">Profile</span>
          </router-link>
        </li>
        <li class="navItem">
          <router-link
            v-if="isOnline() && isAuth()"
            :to="{ name: 'user.logout' }"
          >
            <i class="icon-logout"></i>
            <span class="label">Logout</span>
          </router-link>
        </li>
        <li class="navItem">
          <router-link :to="{ name: 'about.page' }">
            <i class="icon-info-circled"></i>
            <span class="label">About</span>
          </router-link>
        </li>
        <li class="navItem">
          <a
            href="https://luxwarp.info/contact"
            target="_blank"
            rel="noreferrer"
          >
            <i class="icon-mail"></i>
            <span class="label">Contact</span>
          </a>
        </li>
      </ul>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainNav",
  computed: {
    ...mapGetters({
      categories: "getCategories",
      isAuth: "isAuth",
      isOnline: "isOnline",
      getTodosByCategoryId: "getTodosByCategoryId"
    }),
    showMainNav() {
      return this.$store.getters.showMainNav;
    }
  },
  methods: {
    toggleMainNav() {
      this.$store.commit("toggleMainNav");
    }
  }
};
</script>

<style lang="scss" scoped>
.mainNav {
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 50px;
  width: 100%;
  height: 100vh;
  color: $mainNavFontColor;
  background: $mainNavBgColor;
  border: 2px solid red;
  overflow: auto;

  > .categories {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  > .pages {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  > .title {
    width: 100%;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 15px;
    margin: 0;
  }

  .navItem {
    width: 100%;
    transition: all 0.5s;
    display: flex;
    align-items: center;

    > a {
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px;

      > i {
        font-size: 1.8rem;
        margin-right: 10px;
      }

      > .label {
        flex: 1;
      }

      > .badge {
        background: darken($mainNavBgColor, $amount: 5);
        border: 1px solid darken($mainNavBgColor, $amount: 10);
        color: inherit;
        font-size: 0.9rem;
        padding: 2px 10px;
        border-radius: 5px;
        text-align: center;
      }

      &:hover,
      &:active,
      &:focus,
      &.router-link-exact-active {
        background: lighten($mainNavBgColor, 5%);
        color: lighten($mainNavFontColor, 80%);
        transition: all 0.5s;
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .mainNav {
    animation: none;
    z-index: 0;
  }
}
</style>
