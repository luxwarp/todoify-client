<template>
  <div class="container">
    <div class="title">
      <h2>Categories</h2>
    </div>
    <AddNew type="to-do" :categories="categories" @submit="addNewTodo">
      <button class="button success">Add to-do <i class="material-icons">add</i></button>
    </AddNew>
    <ul class="list" v-if="todos.length">
      <li v-for="todo in todos"
        :key="todo._id"
        tag="li">
        <ToolBox>
          <template v-slot:tools>
            <router-link :to="{ name: 'todos.delete', params: { todoId: todo._id }}" class="link alert">Delete</router-link>
          </template>
        </ToolBox>
        <div class="title">{{todo.title}}</div>
        <div class="badge">{{todo.category ? todo.category.title : 'Uncategorized'}}</div>
      </li>
    </ul>
    <p v-else>No to-do's found</p>
  </div>
</template>

<script>
import AddNew from '@/components/modal/AddNew'
import ToolBox from '@/components/toolbox/ToolBox'
export default {
  name: 'TodosAll',
  components: {
    AddNew,
    ToolBox
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
