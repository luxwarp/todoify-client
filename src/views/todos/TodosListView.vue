<template>
  <div class="todosListView">
    <h2>To-do's</h2>
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
<style lang="scss" scoped>
.todosListView {
  width: 100%;
}
</style>
