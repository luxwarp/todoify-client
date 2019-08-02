<template>
  <div class="container">
    <div class="card">
      <div class="title">
        <h2>Profile</h2>
        <router-link :to="{ name: 'user.edit' }">Edit</router-link>
      </div>
      <div class="body">
        <p>
          Name:
          {{ userInfo.name }}<br />
          Email:
          {{ userInfo.email }}<br />
          Account created: {{ userInfo.createdAt | formatDate }}
        </p>
      </div>
    </div>
    <TodosList :limit-todos="5" show-badge title="Latest to-do's" />
    <div v-if="todos.length" class="container maxContent">
      <router-link :to="{ name: 'todos.list' }">
        Show all
      </router-link>
    </div>
    <CategoriesList show-badge title="Latest categories" />
    <div v-if="categories.length" class="container maxContent">
      <router-link :to="{ name: 'categories.list' }" class="text-center"
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
