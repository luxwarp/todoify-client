<template>
  <div v-if="categories.length">
    <div v-if="title" class="title">
      <h3>
        {{ title }}
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
        <div v-if="showBadge" class="badge">
          {{ getTodosByCategoryId(category._id).length }}
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
import { mapGetters } from "vuex";
import NoListItemsFound from "@/components/common/NoListItemsFound/NoListItemsFound";
import ToolBox from "@/components/common/ToolBox/ToolBox";

export default {
  name: "CategoriesList",
  components: {
    ToolBox,
    NoListItemsFound
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
    }
  },
  computed: {
    ...mapGetters({
      categories: "getCategories",
      getTodosByCategoryId: "getTodosByCategoryId"
    })
  }
};
</script>

<style lang="scss"></style>
