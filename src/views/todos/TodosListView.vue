<template>
  <div class="container">
    <div class="title">
      <h2>To-do's</h2>
    </div>
    <AddNew type="to-do" :categories="categories" @submit="addNewTodo" />
    <TodosList show-badge />
  </div>
</template>

<script>
import AddNew from "@/components/modal/AddNew";
import TodosList from "@/components/todos/TodosList/TodosList";
import { mapGetters } from "vuex";
export default {
  name: "TodosListView",
  components: {
    TodosList,
    AddNew
  },
  computed: {
    ...mapGetters({
      todos: "getTodos",
      categories: "getCategories"
    })
  },
  methods: {
    addNewTodo(data) {
      this.$store.dispatch("createTodo", {
        title: data.title,
        category: data.category
      });
    }
  }
};
</script>

<style lang="scss"></style>
