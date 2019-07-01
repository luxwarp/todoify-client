<template>
  <div class="addNewContainer">
    <span @click="show = !show">
      <slot></slot>
    </span>
    <transition name="fadeIn">
      <div class="modal" v-if="show">
        <div class="card">
          <h3 class="title">
              Add new {{ type }}
              <i class="material-icons" @click="show = !show">close</i>
            </h3>
          <div class="body">
            <form @submit.prevent="onSubmit">
              <input v-model="title" type="text" placeholder="Enter a title" required autofocus>
              <button type="submit" class="button primary">Add <i class="material-icons">add</i></button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AddNew',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false,
      title: null
    }
  },
  methods: {
    onSubmit () {
      this.$emit('add-new', this.title)
      this.title = ''
      this.show = false
    }
  }
}
</script>

<style lang="scss">
.addNewContainer {
  cursor: pointer;

  > .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.356);
    z-index: 9999;
  }
}

</style>
