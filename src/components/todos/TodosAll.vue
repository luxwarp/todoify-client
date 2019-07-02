<template>
  <div class="container">
    <h2 class="title"> To-do's </h2>
    <AddNew type="to-do" :categories="categories" @submit="addNewTodo">
      <button class="button success">Add to-do <i class="material-icons">add</i></button>
    </AddNew>
    <ul class="list" v-if="todos.length">
      <li v-for="todo in todos"
        :key="todo._id"
        tag="li">
        <div class="toolsContainer">
          <i class="material-icons" @click="toggleTools(todo._id)">more_vert</i>
          <div class="tools hide" :ref="todo._id">
            <router-link :to="{ name: 'todos.delete', params: { todoId: todo._id }}" class="link alert">Delete</router-link>
          </div>
        </div>
        <div class="title">{{todo.title}}</div>
        <div class="badge">{{todo.category ? todo.category.title : 'Uncategorized'}}</div>
      </li>
    </ul>
    <p v-else>No to-do's found</p>
  </div>
</template>

<script>
import AddNew from '@/components/modal/AddNew'
export default {
  name: 'TodosAll',
  components: {
    AddNew
  },
  computed: {
    todos () {
      return this.$store.getters.getTodos
    },
    categories () {
      return this.$store.getters.getCategories
    }
  },
  methods: {
    addNewTodo (data) {
      this.$store.dispatch('createTodo', { title: data.title, category: data.category })
    },
    toggleTools (id) {
      this.$refs[id][0].classList.toggle('hide')
    }
  }
}
</script>

<style lang="scss">
</style>
