<template>
  <div class="container" v-if="category">
      <div class="title">
        <h2>Category: {{ category.title }}</h2>
    </div>

    <AddNew type="to-do" @submit="addNewTodo">
      <button class="button success">Add to-do <i class="material-icons">add</i></button>
    </AddNew>
    <div class="todos">
      <ul class="list" v-if="todos.length">
        <li v-for="todo in todos"
          :key="todo._id">
          <ToolBox>
            <template v-slot:tools>
              <router-link :to="{ name: 'todos.delete', params: { todoId: todo._id }}" class="link alert">Delete</router-link>
            </template>
        </ToolBox>
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
import ToolBox from '@/components/toolbox/ToolBox'
export default {
  name: 'CategoriesSingle',
  components: {
    AddNew,
    ToolBox
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
