<template>
  <div class="categoriesListView">
    <CategoriesList title="All categories" show-badge />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CategoriesListView",
  computed: {
    ...mapGetters({
      categories: "getCategories"
    })
  }
};
</script>
<style lang="scss" scoped>
.categoriesListView {
  width: 100%;
}
</style>
