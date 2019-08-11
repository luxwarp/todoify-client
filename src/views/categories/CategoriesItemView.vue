<template>
  <div v-if="category" class="categoriesItemView">
    <router-view></router-view>
    <div class="heading">
      <h2 class="label">Category: {{ category.title }}</h2>
      <ToolBox reverse>
        <template v-slot:toggle>
          <i class="icon-cog"></i>
        </template>
        <template v-slot:tools>
          <router-link
            :to="{
              name: 'category.edit',
              params: { categoryId: category._id }
            }"
            class="link"
          >
            <i class="icon-pencil" />
          </router-link>
          <router-link
            :to="{
              name: 'categories.delete',
              params: { categoryId: category._id }
            }"
            class="link alert"
          >
            <i class="icon-trash" />
          </router-link>
        </template>
      </ToolBox>
    </div>
    <TodosList
      title="To-do's"
      :filter-by-category="$route.params.categoryId"
      show-badge
    />
  </div>
  <NotFound v-else />
</template>

<script>
import NotFound from "@/views/pages/NotFoundPage";
export default {
  name: "CategoriesItemView",
  components: {
    NotFound
  },
  computed: {
    category() {
      return this.$store.getters.getCategoryById(this.$route.params.categoryId);
    }
  }
};
</script>

<style lang="scss" scoped>
.categoriesItemView {
  width: 100%;

  > .heading {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
