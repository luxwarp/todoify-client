<template>
  <div class="container">
    <div class="title">
      <h2>To-do's</h2>
    </div>
    <TodosList show-badge />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodosList from "@/components/todos/TodosList/TodosList";
export default {
  name: "TodosListView",
  components: {
    TodosList
  },
  computed: {
    ...mapGetters({
      categories: "getCategories"
    })
  }
};
</script>

<style lang="scss"></style>
