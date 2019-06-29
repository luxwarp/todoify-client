<template>
  <div class="container">
    <div class="categories">
      <h2 class="title"> Categories </h2>
      <ul class="list">
        <li v-for="category in categories"
          :key="category._id">
          <div class="title">{{category.title}}</div>
          <div class="note">{{category.createdAt}}</div>
        </li>
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
