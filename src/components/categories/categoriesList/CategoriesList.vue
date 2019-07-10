<template>
  <ul class="list" v-if="categories.length">
    <li v-for="category in categories" :key="category._id">
      <ToolBox>
        <template v-slot:toggle>
          <i class="material-icons">more_vert</i>
        </template>
        <template v-slot:tools>
          <router-link
            :to="{
              name: 'categories.delete',
              params: { categoryId: category._id }
            }"
            class="link alert"
            >Delete</router-link
          >
        </template>
      </ToolBox>
      <router-link
        :to="{ name: 'categories.item', params: { categoryId: category._id } }"
        class="title"
        >{{ category.title }}</router-link
      >
      <div class="badge" v-if="showingBadgeWithCounter">
        {{ todoCount(category._id) }}
      </div>
    </li>
  </ul>
  <p v-else>No categories found</p>
</template>

<script>
import ToolBox from '@/components/toolbox/ToolBox'
export default {
  name: 'CategoriesList',
  components: {
    ToolBox
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    showBadge: {
      type: Boolean,
      required: false,
      default: false
    },
    todoCount: {
      type: Function,
      required: false
    }
  },
  computed: {
    showingBadgeWithCounter() {
      return this.showBadge && this.todoCount
    }
  }
}
</script>

<style></style>
