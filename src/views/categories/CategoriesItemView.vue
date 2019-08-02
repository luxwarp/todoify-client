<template>
  <div v-if="category" class="container">
    <router-view></router-view>
    <div class="title">
      <h2>Category: {{ category.title }}</h2>
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
            >Edit
          </router-link>
          <router-link
            :to="{
              name: 'categories.delete',
              params: { categoryId: category._id }
            }"
            class="link alert"
            >Delete</router-link
          >
        </template>
      </ToolBox>
    </div>
    <TodosList :filter-by-category="$route.params.categoryId" show-badge />
  </div>
  <NotFound v-else />
</template>

<script>
import ToolBox from "@/components/common/ToolBox/ToolBox";
import TodosList from "@/components/todos/TodosList/TodosList";
import NotFound from "@/views/pages/NotFoundPage";
export default {
  name: "CategoriesItemView",
  components: {
    ToolBox,
    TodosList,
    NotFound
  },
  computed: {
    category() {
      return this.$store.getters.getCategoryById(this.$route.params.categoryId);
    }
  }
};
</script>
