<template>
  <div class="addNewShortcuts">
    <transition-group name="slideInBottom" appear tag="div" class="buttons">
      <l-button
        v-if="showShortcuts"
        key="category"
        design="primary"
        class="roundButton"
        title="Add category"
        @click="showCategoryAdd = !showCategoryAdd"
      >
        <i class="icon-folder"></i>
      </l-button>

      <l-button
        v-if="showShortcuts"
        key="todo"
        design="primary"
        class="roundButton"
        title="Add to-do"
        @click="showTodoAdd = !showTodoAdd"
      >
        <i class="icon-list"></i>
      </l-button>

      <l-button
        key="openShortcuts"
        design="success"
        class="roundButton"
        title="Open shortcuts"
        @click="showShortcuts = !showShortcuts"
      >
        <i :class="showShortcuts ? 'icon-cancel' : 'icon-plus'"></i>
      </l-button>
    </transition-group>
    <TodoAdd :show="showTodoAdd" @close="showTodoAdd = !showTodoAdd" />
    <CategoryAdd
      :show="showCategoryAdd"
      @close="showCategoryAdd = !showCategoryAdd"
    />
  </div>
</template>

<script>
export default {
  name: "AddNewShortcuts",
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
  z-index: 99999;

  > .buttons {
    display: flex;
    flex-direction: column;

    > .roundButton {
      border-radius: 50%;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
      margin-top: 10px;

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
