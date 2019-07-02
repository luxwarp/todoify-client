<template>
  <div class="container">
    <h2 class="title">Categories</h2>
    <AddNew type="category" @submit="addNewCategory">
      <button class="button success">Add category <i class="material-icons" title="Add a new category">add</i></button>
    </AddNew>
    <ul class="list" v-if="categories.length">
    <router-link :to="{ name: 'categories.single', params: { categoryId: category._id }}"
      v-for="category in categories"
      :key="category._id"
      tag="li">
      <div class="title">{{ category.title }}</div>
      <div class="badge">{{ todoCount(category._id) }}</div>
    </router-link>
  </ul>
  <p v-else>No categories found</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddNew from '@/components/modal/AddNew'
export default {
  name: 'CategoriesAll',
  components: {
    AddNew
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories'
    })
  },
  methods: {
    todoCount (id) {
      return this.$store.getters.getTodosByCategoryId(id).length
    },

    addNewCategory (data) {
      this.$store.dispatch('createCategory', data.title)
    }
  }
}
</script>

<style lang="scss">
</style>
