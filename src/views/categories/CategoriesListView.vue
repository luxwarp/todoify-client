<template>
  <div class="categoriesListView">
    <h2>Categories</h2>
    <CategoriesList show-badge />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoriesList from "@/components/categories/categoriesList/CategoriesList";
export default {
  name: "CategoriesListView",
  components: {
    CategoriesList
  },
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
