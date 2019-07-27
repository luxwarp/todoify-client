<template>
  <div class="container">
    <div class="card">
      <div class="title">
        <h2>Profile</h2>
        <router-link :to="{ name: 'user.edit' }">Edit</router-link>
      </div>
      <p v-if="userInfo.name">{{ userInfo.name }}</p>
      <p>{{ userInfo.email }}</p>
      <p>Account created: {{ userInfo.createdAt | formatDate }}</p>
    </div>
    <TodosList :limit-todos="5" show-badge title="Latest to-do's" />
    <div v-if="todos.length" class="container">
      <router-link :to="{ name: 'todos.list' }" class="text-center"
        >Show all</router-link
      >
    </div>
    <CategoriesList show-badge title="Latest categories" />
    <div v-if="categories.length" class="container">
      <router-link :to="{ name: 'todos.list' }" class="text-center"
        >Show all</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodosList from "@/components/todos/TodosList/TodosList";
import CategoriesList from "@/components/categories/categoriesList/CategoriesList";
export default {
  name: "UserProfile",
  components: {
    TodosList,
    CategoriesList
  },
  filters: {
    formatDate(value) {
      const date = new Date(value);

      const formatted = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      return formatted;
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      todos: "getTodos",
      belongToCategory: "belongToCategory",
      categories: "getCategories"
    })
  }
};
</script>

<style lang="scss"></style>
