<template>
  <div class="todosListView">
    <h2>To-do's</h2>
    <TodosList show-badge />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TodosListView",
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
