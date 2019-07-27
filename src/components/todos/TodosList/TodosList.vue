<template>
  <div v-if="todosToShow.length">
    <TodoEdit v-if="editTodo" :todo="editTodo" @close="editTodo = null" />
    <div v-if="title" class="title">
      <h3>
        {{ title }}
      </h3>
    </div>
    <ul class="list">
      <li v-for="todo in todosToShow" :key="todo._id">
        <ToolBox>
          <template v-slot:tools>
            <span class="link" @click="openEdit(todo)">Edit</span>
            <router-link
              :to="{ name: 'todos.delete', params: { todoId: todo._id } }"
              class="link alert"
            >
              Delete
            </router-link>
          </template>
        </ToolBox>
        <div class="title">{{ todo.title }}</div>
        <div v-if="showBadge" class="badge">
          <router-link
            v-if="todo.category"
            :to="{
              name: 'categories.item',
              params: { categoryId: todo.category }
            }"
          >
            {{ belongToCategory(todo.category) }}
          </router-link>
          <template v-else>
            {{ belongToCategory(todo.category) }}
          </template>
        </div>
      </li>
    </ul>
  </div>
  <NoListItemsFound v-else>
    <template v-slot:title>
      No to-do's found
    </template>
    <template v-slot:subtitle>
      Create one now!
    </template>
  </NoListItemsFound>
</template>

<script>
import TodoEdit from "@/components/todos/TodoEdit/TodoEdit";
import ToolBox from "@/components/common/ToolBox/ToolBox";
import NoListItemsFound from "@/components/common/NoListItemsFound/NoListItemsFound";
import { mapGetters } from "vuex";
export default {
  name: "TodosList",
  components: {
    ToolBox,
    NoListItemsFound,
    TodoEdit
  },
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    showBadge: {
      type: Boolean,
      required: false,
      default: false
    },
    filterByCategory: {
      type: String,
      required: false,
      default: null
    },
    limitTodos: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data() {
    return {
      editTodo: null
    };
  },
  computed: {
    ...mapGetters({
      getTodos: "getTodos",
      getTodosByCategoryId: "getTodosByCategoryId",
      getCategoryById: "getCategoryById"
    }),
    todosToShow() {
      let todos = null;
      if (this.filterByCategory) {
        todos = this.getTodosByCategoryId(this.filterByCategory);
      } else {
        todos = this.getTodos;
      }

      if (this.limitTodos) {
        todos = todos.slice(0, this.limitTodos);
      }
      return todos;
    }
  },
  methods: {
    openEdit(todo) {
      this.editTodo = todo;
    },
    belongToCategory(id) {
      const category = this.getCategoryById(id);
      return category ? category.title : "Uncategorized";
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 400;
  margin: 15px 0;
  color: $containerTitleFontColor;
}
</style>
