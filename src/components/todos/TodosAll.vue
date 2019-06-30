<template>
  <div class="container">
    <div class="todos">
      <h2 class="title"> To-do's </h2>
      <ul class="list" v-if="todos.length">
        <router-link :to="{ name: 'todos.single', params: { todoId: todo._id }}"
          v-for="todo in todos"
          :key="todo._id"
          tag="li">
          <div class="title">{{todo.title}}</div>
          <div class="badge">{{todo.category ? todo.category.title : 'Uncategorized'}}</div>
        </router-link>
      </ul>
      <p v-else>No to-do's found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodosAll',
  computed: {
    todos () {
      return this.$store.getters.getTodos
    }
  }
}
</script>

<style lang="scss">
</style>
