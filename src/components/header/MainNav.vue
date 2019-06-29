<template>
  <transition name="slidedown">
  <div class="mainNav" v-if="showMainNav">
    <div class="pages" @click="toggleMainNav">
      <router-link :to="{name: 'home'}" class="navItem">
        <i class="material-icons md-36">home</i>
        <span class="label">Home</span>
      </router-link>
      <router-link :to="{name: 'user.login'}" class="navItem" v-if="!isAuth()">
        <i class="material-icons md-36">lock_open</i>
        <span class="label">Login</span>
      </router-link>
      <router-link :to="{name: 'user.register'}" class="navItem" v-if="!isAuth()">
        <i class="material-icons md-36">add_circle_outline</i>
        <span class="label">Register</span>
      </router-link>
      <router-link :to="{name: 'user.profile'}" class="navItem" v-if="isAuth()">
        <i class="material-icons md-36">face</i>
        <span class="label">Profile</span>
      </router-link>
      <router-link :to="{name: 'user.logout'}" class="navItem" v-if="isAuth()">
        <i class="material-icons md-36">remove_circle_outline</i>
        <span class="label">Logout</span>
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
import { mapGetters } from 'vuex'
export default {
  name: 'mainNav',
  computed: {
    ...mapGetters([
      'isAuth'
    ]),
    showMainNav () {
      return this.$store.getters.showMainNav
    }
  },
  methods: {
    toggleMainNav () {
      this.$store.commit('toggleMainNav')
    }
  }
}
</script>

<style lang="scss" scoped>
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

    .pages {
      display: flex;
      flex-direction: column;
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
      background: #223A52;
      color: #D9E2ED;
      transition: all 0.5s;
    }

    .navItem:active {
      background: #223A52;
      color: #D9E2ED;
    }

    .router-link-exact-active {
      background: #223A52;
      color: #D9E2ED;
    }

    .closeMainNav {
      position: fixed;
      bottom: 20px;
      align-self: center;
      background: $roundButtonBgColor;
      box-shadow: $primaryBoxShadow;
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

.slidedown-enter-active {
  animation: slideDown 0.5s ease-in;
}

.slidedown-leave-active {
  animation: slideDown 0.5s ease-out reverse;
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0%);
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
