<template>
  <div v-if="todosToShow.length" class="todosList">
    <TodoEdit v-if="editTodo" :todo="editTodo" @close="editTodo = null" />
    <h3 v-if="title" class="title">
      {{ title }}
    </h3>
    <LList>
      <li v-for="todo in notDoneTodos" :key="todo._id">
        <ToolBox>
          <template v-slot:tools>
            <button class="button noStyle" @click="toggleDone(todo)">
              <i class="icon-ok" />
            </button>
            <button class="button noStyle" @click="openEdit(todo)">
              <i class="icon-pencil" />
            </button>
            <router-link
              :to="{ name: 'todos.delete', params: { todoId: todo._id } }"
              class="link alert"
            >
              <i class="icon-trash" />
            </router-link>
          </template>
        </ToolBox>
        <div
          class="title"
          title="Click to mark done."
          @click="toggleDone(todo)"
        >
          {{ todo.title }}
        </div>
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
      <li v-if="doneTodos.length">
        <h3 class="title">Done</h3>
      </li>
      <li v-for="todo in doneTodos" :key="todo._id">
        <ToolBox>
          <template v-slot:tools>
            <button class="button noStyle" @click="toggleDone(todo)">
              <i class="icon-cancel" />
            </button>
            <button class="button noStyle" @click="openEdit(todo)">
              <i class="icon-pencil" />
            </button>
            <router-link
              :to="{ name: 'todos.delete', params: { todoId: todo._id } }"
              class="link alert"
            >
              <i class="icon-trash" />
            </router-link>
          </template>
        </ToolBox>
        <div
          class="title"
          title="Click to mark not done."
          @click="toggleDone(todo)"
        >
          {{ todo.title }}
        </div>
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
    </LList>
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
import ToolBox from "@/components/common/ToolBox/ToolBox";
import TodoEdit from "@/components/todos/TodoEdit/TodoEdit";
import { mapGetters } from "vuex";
export default {
  name: "TodosList",
  components: {
    ToolBox,
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
    },
    doneTodos() {
      return this.todosToShow.filter(todo => todo.done);
    },
    notDoneTodos() {
      return this.todosToShow.filter(todo => !todo.done);
    }
  },
  methods: {
    openEdit(todo) {
      this.editTodo = todo;
    },
    belongToCategory(id) {
      const category = this.getCategoryById(id);
      return category ? category.title : "Uncategorized";
    },
    toggleDone(todo) {
      todo.done = !todo.done;
      this.$store.dispatch("updateTodo", todo);
    }
  }
};
</script>

<style lang="scss" scoped>
.todosList {
  > .title {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 300;
    margin: 15px 0;
  }

  button {
    margin-bottom: 0;
  }
}
</style>
