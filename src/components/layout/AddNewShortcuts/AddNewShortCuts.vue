<template>
  <div class="addNewShortcuts">
    <transition-group name="slideInBottom" appear tag="div" class="buttons">
      <button
        v-if="showShortcuts"
        key="category"
        class="button primary"
        title="Add category"
        @click="showCategoryAdd = !showCategoryAdd"
      >
        <i class="icon-folder"></i>
      </button>

      <button
        v-if="showShortcuts"
        key="todo"
        class="button primary"
        title="Add to-do"
        @click="showTodoAdd = !showTodoAdd"
      >
        <i class="icon-list"></i>
      </button>

      <button
        key="openShortcuts"
        class="button success"
        title="Open shortcuts"
        @click="showShortcuts = !showShortcuts"
      >
        <i :class="showShortcuts ? 'icon-cancel' : 'icon-plus'"></i>
      </button>
    </transition-group>
    <TodoAdd :show="showTodoAdd" @close="showTodoAdd = !showTodoAdd" />
    <CategoryAdd
      :show="showCategoryAdd"
      @close="showCategoryAdd = !showCategoryAdd"
    />
  </div>
</template>

<script>
import TodoAdd from "@/components/todos/TodoAdd/TodoAdd";
import CategoryAdd from "@/components/categories/CategoryAdd/CategoryAdd";
export default {
  name: "AddNewShortcuts",
  components: {
    TodoAdd,
    CategoryAdd
  },
  data() {
    return {
      showShortcuts: false,
      showTodoAdd: false,
      showCategoryAdd: false
    };
  }
};
</script>

<style lang="scss" scoped>
.addNewShortcuts {
  position: fixed;
  right: 10px;
  bottom: 25px;
  display: flex;

  > .buttons {
    display: flex;
    flex-direction: column;

    > .button {
      border-radius: 50%;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);

      &:last-child {
        margin-bottom: 0;
      }

      > i {
        margin: 0;
      }
    }
  }
}

@media screen and(min-width: 1025px) {
  .addNewShortcuts {
    bottom: 10px;
  }
}
</style>
