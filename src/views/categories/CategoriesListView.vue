<template>
  <div class="container">
    <div class="title">
      <h2>Categories</h2>
    </div>
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
