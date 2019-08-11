<template>
  <div class="todosListView">
    <TodosList title="All to-do's" show-badge />
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
