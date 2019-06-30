<template>
  <div class="container">
    <div class="categories">
      <h2 class="title"> Categories </h2>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CategoriesAll',
  computed: {
    ...mapGetters({
      categories: 'getCategories'
    })
  },
  methods: {
    todoCount (id) {
      return this.$store.getters.getTodosByCategoryId(id).length
    }
  }
}
</script>

<style lang="scss">
</style>
