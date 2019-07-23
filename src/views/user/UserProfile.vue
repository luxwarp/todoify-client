<template>
  <div class="container">
    <div class="card">
      <div class="title">
        <h2>Profile</h2>
        <router-link :to="{ name: 'user.edit' }">Edit</router-link>
      </div>
      <p v-if="userInfo.name">{{ userInfo.name }}</p>
      <p>{{ userInfo.email }}</p>
      <p>{{ userInfo.createdAt }}</p>
    </div>
    <TodosList
      :todos="todos.slice(0, 5)"
      :belong-to-category="belongToCategory"
      show-badge
      >Latest to-do's</TodosList
    >
    <div v-if="todos.length" class="container">
      <router-link :to="{ name: 'todos.list' }" class="text-center"
        >Show all</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodosList from "@/components/todos/TodosList";
export default {
  name: "UserProfile",
  components: {
    TodosList
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      todos: "getTodos",
      belongToCategory: "belongToCategory"
    })
  }
};
</script>

<style lang="scss"></style>
