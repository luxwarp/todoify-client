<template>
  <div class="container">
    <div class="title">
      <h2>To-do's</h2>
    </div>
    <AddNew type="to-do" :categories="categories" @submit="addNewTodo">
      <button class="button success">Add to-do <i class="material-icons">add</i></button>
    </AddNew>
    <TodosList :todos="todos" :showBadge="true" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodosList from '@/components/todos/TodosList'
import AddNew from '@/components/modal/AddNew'
export default {
  name: 'TodosListView',
  components: {
    TodosList,
    AddNew
  },
  computed: {
    ...mapGetters({
      todos: 'getTodos',
      categories: 'getCategories'
    })
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
