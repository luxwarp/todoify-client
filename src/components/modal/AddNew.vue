<template>
  <div class="addNewContainer">
    <span @click="show = !show">
      <slot name="button">
        <button class="button success">
          Add {{ type }}
          <i class="fas fa-plus"></i>
        </button>
      </slot>
    </span>
    <transition name="fadeIn">
      <div v-if="show" class="modal container">
        <div class="card">
          <h3 class="title">
            Add new {{ type }}
            <i class="fas fa-times" @click="show = !show"></i>
          </h3>
          <div class="body">
            <form @submit.prevent="onSubmit">
              <input
                v-model="title"
                v-focus
                type="text"
                placeholder="Enter a title"
                required
              />
              <div v-if="categories.length" class="row">
                <label>Category: </label>
                <select v-model="selectedCategory">
                  <option value="null">Uncategorized</option>
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.title }}
                  </option>
                </select>
              </div>
              <button type="submit" class="button primary">
                Add <i class="fas fa-plus"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AddNew",
  props: {
    type: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      title: null,
      selectedCategory: null
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", { title: this.title, category: this.category });
      this.title = null;
      this.category = null;
      this.show = false;
    }
  }
};
</script>

<style lang="scss">
.addNewContainer {
  align-self: flex-start;
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
    padding: 15px;

    .row {
      align-items: center;
      > select {
        flex: 1;
        margin-left: 10px;
      }
    }
  }
}
</style>
