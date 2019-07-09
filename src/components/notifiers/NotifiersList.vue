<template>
    <transition-group class="notifiers" name="slideInLeft" tag="div">
      <div v-for="(notifier, index) in notifiers" :key="index+1" :class="notifier.type" class="notifier">
        <i class="material-icons"></i>
        <span class="message">{{ notifier.message }}</span>
        <i class="material-icons close" @click="close(index)">close</i>
      </div>
    </transition-group>
</template>

<script>
export default {
  name: 'NotifiersList',
  computed: {
    notifiers () {
      return this.$store.getters.getNotifiers
    }
  },
  methods: {
    close (index) {
      this.$store.commit('closeNotifier', index)
    }
  },
  updated () {
    if (this.notifiers.length >= 1) {
      let vm = this
      setTimeout(() => {
        vm.$store.commit('closeNotifier')
      }, 5000)
    }
  }
}
</script>

<style lang="scss">
.notifiers {
  display: flex;
  flex-direction: column;
  width: 100%;

  .notifier {
    display: flex;
    flex-direction: row;
    padding: 15px;
    align-items: center;

    > .material-icons {
      font-size: 20px;
      margin-right: 15px;
      width: 20px;
    }

    > .message {
      width: 100%;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    > .close {
      font-size: 18px;
      margin: 0;
      padding: 0;
      &::before {
        content: none !important;
      }
    }
  }

  > .error {
    background: #F8D7DA;
    color: rgb(110, 49, 54);

    > .material-icons::before {
      content: "error_outline";
    }
  }

  > .warning {
    background: #FFF3CD;
    color: rgb(110, 104, 49);

    > .material-icons::before {
      content: "warning";
    }
  }

  > .success {
    background: #D4EDDA;
    color: rgb(51, 110, 49);

    > .material-icons::before {
      content: "check";
    }
  }

  > .info {
    background: #D1ECF1;
    color: rgb(49, 80, 110);

    > .material-icons::before {
      content: "info";
    }
  }
}

</style>
