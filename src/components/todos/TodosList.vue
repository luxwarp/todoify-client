<template>
  <ul v-if="todos.length" class="list">
    <li v-for="todo in todos" :key="todo._id">
      <ToolBox>
        <template v-slot:tools>
          <router-link
            :to="{ name: 'todos.delete', params: { todoId: todo._id } }"
            class="link alert"
            >Delete</router-link
          >
        </template>
      </ToolBox>
      <div class="title">{{ todo.title }}</div>
      <div v-if="showBadge && belongToCategory" class="badge">
        {{ belongToCategory(todo.category) }}
      </div>
    </li>
  </ul>
  <p v-else>No to-do's found</p>
</template>

<script>
import ToolBox from "@/components/toolbox/ToolBox";
export default {
  name: "TodosList",
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
    },
    belongToCategory: {
      type: Function,
      required: false,
      default: null
    }
  }
};
</script>

<style lang="scss"></style>
