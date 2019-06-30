<template>
  <div class="container" v-if="category">
    <h2 class="title">{{ category.title }} </h2>

    <div class="todos">
      <ul class="list" v-if="todos.length">
        <li v-for="todo in todos"
          :key="todo._id">
          {{ todo.title }}
        </li>
      </ul>
      <p v-else>No to-do's found</p>
    </div>
  </div>
  <div class="notFound" v-else>
    <p>Not found</p>
  </div>
</template>

<script>
export default {
  name: 'category.id',
  computed: {
    category () {
      return this.$store.getters.getCategoryById(this.$route.params.categoryId)
    },
    todos () {
      return this.$store.getters.getTodosByCategoryId(this.$route.params.categoryId)
    }
  }
}
</script>

<style lang="scss">

</style>
