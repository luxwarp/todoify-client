<template>
  <div class="container">
    <div class="categories">
      <h2 class="title"> Categories </h2>
      <ul class="list">
        <router-link :to="{ name: 'categories.id', params: { categoryId: category._id }}"
          v-for="category in categories"
          :key="category._id"
          tag="li">
          <div class="title">{{category.title}}</div>
          <div class="note">{{category.createdAt}}</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'categories.all',
  computed: {
    ...mapGetters({
      categories: 'getCategories'
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  .categories {
    margin: 15px;
  }
}

</style>
