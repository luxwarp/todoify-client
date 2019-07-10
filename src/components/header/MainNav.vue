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
          <i class="material-icons md-36">folder</i>{{ category.title }}
        </router-link>
      </div>
      <div class="pages" @click="toggleMainNav">
        <span class="title">Menu</span>
        <router-link :to="{ name: 'home.page' }" class="navItem">
          <i class="material-icons md-36">home</i>
          <span class="label">Home</span>
        </router-link>
        <router-link
          v-if="!isAuth()"
          :to="{ name: 'user.login' }"
          class="navItem"
        >
          <i class="material-icons md-36">lock_open</i>
          <span class="label">Login</span>
        </router-link>
        <router-link
          v-if="!isAuth()"
          :to="{ name: 'user.register' }"
          class="navItem"
        >
          <i class="material-icons md-36">add_circle_outline</i>
          <span class="label">Register</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'categories.list' }"
          class="navItem"
        >
          <i class="material-icons md-36">folder_open</i>
          <span class="label">Categories</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'todos.list' }"
          class="navItem"
        >
          <i class="material-icons md-36">list</i>
          <span class="label">To-do's</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'user.profile' }"
          class="navItem"
        >
          <i class="material-icons md-36">face</i>
          <span class="label">Profile</span>
        </router-link>
        <router-link
          v-if="isAuth()"
          :to="{ name: 'user.logout' }"
          class="navItem"
        >
          <i class="material-icons md-36">remove_circle_outline</i>
          <span class="label">Logout</span>
        </router-link>
        <router-link :to="{ name: 'about.page' }" class="navItem">
          <i class="material-icons md-36">info</i>
          <span class="label">About</span>
        </router-link>
      </div>
      <button class="closeMainNav" @click="toggleMainNav">
        <i class="material-icons md-36">
          clear
        </i>
      </button>
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
  position: static;
  top: 0;
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

  .closeMainNav {
    position: fixed;
    bottom: 20px;
    align-self: center;
    background: $roundButtonBgColor;
    box-shadow: $defaultBoxShadow;
    color: $roundButtonFontColor;
    border-radius: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: none;
  }

  .closeMainNav:hover {
    background: lighten($roundButtonBgColor, 5);
    color: lighten($roundButtonFontColor, 5);
  }

  .closeMainNav:active {
    background: lighten($roundButtonBgColor, 5);
    color: lighten($roundButtonFontColor, 5);
  }
}

@media screen and (min-width: 1025px) {
  .mainNav {
    height: auto;
    animation: none;

    .closeMainNav {
      display: none;
    }
  }
}
</style>
