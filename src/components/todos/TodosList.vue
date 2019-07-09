<template>
  <ul class="list" v-if="todos.length">
      <li v-for="todo in todos"
        :key="todo._id">
        <ToolBox>
          <template v-slot:tools>
            <router-link :to="{ name: 'todos.delete', params: { todoId: todo._id }}" class="link alert">Delete</router-link>
          </template>
        </ToolBox>
        <div class="title">{{todo.title}}</div>
        <div class="badge" v-if="showBadge">{{todo.category ? todo.category.title : 'Uncategorized'}}</div>
      </li>
    </ul>
    <p v-else>No to-do's found</p>
</template>

<script>
import ToolBox from '@/components/toolbox/ToolBox'
export default {
  name: 'TodosList',
  components: {
    ToolBox
  },
  props: {
    todos: {
      type: Array,
      required: true
    },
    showBadge: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss">

</style>
