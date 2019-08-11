<template>
  <div>
    <CategoryAdd
      :show="showCategoryAdd"
      @close="showCategoryAdd = !showCategoryAdd"
    />
    <div v-if="categories.length" class="categoriesList">
      <h2 v-if="title" class="categoriesList--title">
        {{ title }}
      </h2>
      <LList v-if="categories.length">
        <li v-for="category in categories" :key="category._id">
          <ToolBox>
            <template v-slot:tools>
              <router-link
                :to="{
                  name: 'category.edit',
                  params: { categoryId: category._id }
                }"
                class="link"
              >
                <i class="icon-pencil" />
              </router-link>
              <router-link
                :to="{
                  name: 'categories.delete',
                  params: { categoryId: category._id }
                }"
                class="link alert"
              >
                <i class="icon-trash" />
              </router-link>
            </template>
          </ToolBox>
          <router-link
            :to="{
              name: 'categories.item',
              params: { categoryId: category._id }
            }"
            class="title"
            title="Go to category."
          >
            {{ category.title }}
          </router-link>
          <div v-if="showBadge" class="badge">
            {{ getTodosByCategoryId(category._id).length }}
          </div>
        </li>
      </LList>
    </div>
    <NoListItemsFound v-else>
      <template v-slot:title>
        No categories found
      </template>
      <template v-slot:subtitle>
        <button
          class="button success"
          style="margin: auto;"
          @click="showCategoryAdd = !showCategoryAdd"
        >
          <span class="label">Create one now</span>
          <i class="icon-plus" />
        </button>
      </template>
    </NoListItemsFound>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CategoriesList",
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
  data() {
    return {
      showCategoryAdd: false
    };
  },
  computed: {
    ...mapGetters({
      categories: "getCategories",
      getTodosByCategoryId: "getTodosByCategoryId"
    })
  }
};
</script>

<style lang="scss" scoped>
.categoriesList {
  > .categoriesList--title {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 300;
    margin: 15px 0;
  }
}
</style>
