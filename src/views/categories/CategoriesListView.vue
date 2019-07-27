<template>
  <div class="container">
    <div class="title">
      <h2>Categories</h2>
    </div>
    <AddNew type="category" @submit="addNewCategory" />
    <CategoriesList show-badge />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddNew from "@/components/modal/AddNew";
import CategoriesList from "@/components/categories/categoriesList/CategoriesList";
export default {
  name: "CategoriesListView",
  components: {
    AddNew,
    CategoriesList
  },
  computed: {
    ...mapGetters({
      categories: "getCategories"
    })
  },
  methods: {
    addNewCategory(data) {
      this.$store.dispatch("createCategory", data.title);
    }
  }
};
</script>

<style lang="scss"></style>
