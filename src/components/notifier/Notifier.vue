<template>
  <div class="notifiers">
    <transition-group name="slide">
      <div v-for="(notifier, index) in notifiers" :key="index+1" :class="notifier.type" class="notifier">
        <span class="icon"></span> <span class="message">{{ notifier.message }}</span><span class="close" @click="close(index)">&#8855;</span>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'notifier',
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

<style lang="scss" scoped>
.notifiers {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 0px solid black;

  .notifier {
    display: flex;
    flex-direction: row;
    padding: 15px;
    align-items: center;

    .icon {
      font-size: 20px;
      margin-right: 15px;
      width: 20px;
    }

    .message {
      width: 100%;
    }

    .message::first-letter {
      text-transform: uppercase;
    }

    .close {
      font-size: 20px;
    }
  }

  .error {
    background: #F8D7DA;
    color: rgb(110, 49, 54);

    .icon::before {
      content: "\2690";
    }
  }

  .warning {
    background: #FFF3CD;
    color: rgb(110, 104, 49);

    .icon::before {
      content: "\26A0";
    }
  }

  .success {
    background: #D4EDDA;
    color: rgb(51, 110, 49);

    .icon::before {
      content: "\2713";
    }
  }

  .info {
    background: #D1ECF1;
    color: rgb(49, 80, 110);

    .icon::before {
      content: "\2139";
    }
  }
}

.slide-enter-active {
  animation: slide 0.5s ease-in;
}

.slide-leave-active {
  animation: slide 0.5s reverse ease-in-out;
}

@keyframes slide {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}

</style>
