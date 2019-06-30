<template>
  <div class="container">
    <div class="todos">
      <h2 class="title"> To-do's </h2>
      <ul class="list" v-if="todos.length">
        <router-link :to="{ name: 'todos.id', params: { todoId: todo._id }}"
          v-for="todo in todos"
          :key="todo._id"
          tag="li">
          <div class="title">{{todo.title}}</div>
          <div class="note">{{todo.createdAt}}</div>
        </router-link>
      </ul>
      <p v-else>No to-do's found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todos.all',
  computed: {
    todos () {
      return this.$store.getters.getTodos
    }
  }
}
</script>

<style lang="scss">
</style>
