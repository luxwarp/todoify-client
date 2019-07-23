<template>
  <div v-if="category" class="container">
    <div class="title">
      <h2>Category: {{ category.title }}</h2>
      <ToolBox class="reverse">
        <template v-slot:toggle>
          <i class="fas fa-cog"></i>
        </template>
        <template v-slot:tools>
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
    <AddNew type="to-do" @submit="addNewTodo" />
    <TodosList :todos="todos" :show-badge="true" />
  </div>
  <NotFound v-else />
</template>

<script>
import ToolBox from "@/components/common/ToolBox/ToolBox";
import AddNew from "@/components/modal/AddNew";
import TodosList from "@/components/todos/TodosList";
import NotFound from "@/views/pages/NotFoundPage";
export default {
  name: "CategoriesItemView",
  components: {
    ToolBox,
    AddNew,
    TodosList,
    NotFound
  },
  computed: {
    category() {
      return this.$store.getters.getCategoryById(this.$route.params.categoryId);
    },
    todos() {
      return this.$store.getters.getTodosByCategoryId(
        this.$route.params.categoryId
      );
    }
  },
  methods: {
    addNewTodo(data) {
      this.$store.dispatch("createTodo", {
        title: data.title,
        category: this.$route.params.categoryId
      });
    }
  }
};
</script>

<style lang="scss"></style>
