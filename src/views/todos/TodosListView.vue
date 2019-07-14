<template>
  <div class="container">
    <div class="title">
      <h2>To-do's</h2>
    </div>
    <AddNew type="to-do" :categories="categories" @submit="addNewTodo" />
    <TodosList
      :todos="todos"
      :belong-to-category="belongToCategory"
      :show-badge="true"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodosList from "@/components/todos/TodosList";
import AddNew from "@/components/modal/AddNew";
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
    },
    toggleTools(id) {
      this.$refs[id][0].classList.toggle("hide");
    },
    belongToCategory(id) {
      const category = this.categories.find(category => category._id === id);
      return category ? category.title : "Uncategorized";
    }
  }
};
</script>

<style lang="scss"></style>
