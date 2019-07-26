<template>
  <div v-if="categories.length">
    <div v-if="$slots.default" class="title">
      <h3>
        <slot>Categories</slot>
      </h3>
    </div>
    <ul v-if="categories.length" class="list">
      <li v-for="category in categories" :key="category._id">
        <ToolBox>
          <template v-slot:tools>
            <router-link
              :to="{
                name: 'category.edit',
                params: { categoryId: category._id }
              }"
              class="link"
              >Edit
            </router-link>
            <router-link
              :to="{
                name: 'categories.delete',
                params: { categoryId: category._id }
              }"
              class="link alert"
            >
              Delete
            </router-link>
          </template>
        </ToolBox>
        <router-link
          :to="{
            name: 'categories.item',
            params: { categoryId: category._id }
          }"
          class="title"
        >
          {{ category.title }}
        </router-link>
        <div v-if="showingBadgeWithCounter" class="badge">
          {{ todoCount(category._id) }}
        </div>
      </li>
    </ul>
  </div>
  <NoListItemsFound v-else>
    <template v-slot:title>
      No categories found
    </template>
    <template v-slot:subtitle>
      Create one now!
    </template>
  </NoListItemsFound>
</template>

<script>
import ToolBox from "@/components/common/ToolBox/ToolBox";
import NoListItemsFound from "@/components/common/NoListItemsFound/NoListItemsFound";

export default {
  name: "CategoriesList",
  components: {
    ToolBox,
    NoListItemsFound
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
      required: false,
      default: null
    }
  },
  computed: {
    showingBadgeWithCounter() {
      return this.showBadge && this.todoCount;
    }
  }
};
</script>

<style lang="scss"></style>
