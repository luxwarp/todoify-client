<template>
  <transition name="slideInTop">
    <div v-if="showMainNav" class="mainNav">
      <div v-if="categories.length" class="categories" @click="toggleMainNav">
        <span class="title">Categories</span>
        <router-link
          v-for="category in categories"
          :key="category._id"
          :to="{
            name: 'categories.item',
            params: { categoryId: category._id }
          }"
          class="navItem"
        >
          <i class="fas fa-folder fa-2x"></i>{{ category.title }}
        </router-link>
      </div>
      <div class="pages" @click="toggleMainNav">
        <span class="title">Menu</span>
        <router-link :to="{ name: 'home.page' }" class="navItem">
          <i class="fas fa-home fa-2x"></i>
          <span class="label">Home</span>
        </router-link>
        <router-link
          v-if="!isAuth()"
          :to="{ name: 'user.login' }"
          class="navItem"
        >
          <i class="fas fa-sign-in-alt fa-2x"></i>
          <span class="label">Login</span>
        </router-link>
        <router-link
          v-if="!isAuth()"
          :to="{ name: 'user.register' }"
          class="navItem"
        >
          <i class="fas fa-user-plus fa-2x"></i>
          <span class="label">Register</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'categories.list' }"
          class="navItem"
        >
          <i class="fas fa-folder-open fa-2x"></i>
          <span class="label">Categories</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'todos.list' }"
          class="navItem"
        >
          <i class="fas fa-list fa-2x"></i>
          <span class="label">To-do's</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'user.profile' }"
          class="navItem"
        >
          <i class="fas fa-user fa-2x"></i>
          <span class="label">Profile</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'user.logout' }"
          class="navItem"
        >
          <i class="fas fa-sign-out-alt fa-2x"></i>
          <span class="label">Logout</span>
        </router-link>
        <router-link :to="{ name: 'about.page' }" class="navItem">
          <i class="fas fa-info-circle fa-2x"></i>
          <span class="label">About</span>
        </router-link>
        <a href="https://luxwarp.info/contact" class="navItem" target="_blank">
          <i class="fas fa-envelope fa-2x"></i>
          <span class="label">Contact</span>
        </a>
      </div>
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
      isAuth: "isAuth"
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

<style lang="scss">
.mainNav {
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  color: $mainNavFontColor;
  background: $mainNavBgColor;

  .categories {
    display: flex;
    flex-direction: column;
  }

  .pages {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1.2rem;
    padding: 15px;
    border-bottom: 4px solid #223a52;
  }

  .navItem {
    color: inherit;
    text-decoration: none;
    padding: 15px;
    display: flex;
    align-items: center;
    outline: none;
    transition: all 0.5s;

    i {
      margin-right: 20px;
    }
  }

  .navItem:hover {
    background: #223a52;
    color: #d9e2ed;
    transition: all 0.5s;
  }

  .navItem:active {
    background: #223a52;
    color: #d9e2ed;
  }

  .router-link-exact-active {
    background: #223a52;
    color: #d9e2ed;
  }
}

@media screen and (min-width: 1025px) {
  .mainNav {
    height: auto;
    animation: none;
  }
}
</style>
