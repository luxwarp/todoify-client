<template>
  <div class="container" v-if="category">
    <h2 class="title">Category: {{ category.title }} </h2>

    <AddNew type="to-do" @submit="addNewTodo">
      <button class="button primary">Add to-do <i class="material-icons">add</i></button>
    </AddNew>
    <div class="todos">
      <ul class="list" v-if="todos.length">
        <li v-for="todo in todos"
          :key="todo._id">
          <div class="title">{{todo.title}}</div>
        </li>
      </ul>
      <p v-else>No to-do's found.</p>
    </div>
  </div>
  <div class="notFound" v-else>
    <p>Not found</p>
  </div>
</template>

<script>
import AddNew from '@/components/modal/AddNew'
export default {
  name: 'CategoriesSingle',
  components: {
    AddNew
  },
  computed: {
    category () {
      return this.$store.getters.getCategoryById(this.$route.params.categoryId)
    },
    todos () {
      return this.$store.getters.getTodosByCategoryId(this.$route.params.categoryId)
    }
  },
  methods: {
    addNewTodo (data) {
      this.$store.dispatch('createTodo', { title: data.title, category: this.$route.params.categoryId })
    }
  }
}
</script>

<style lang="scss">
</style>
