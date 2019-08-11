<template>
  <div>
    <CategoryAdd
      :show="showCategoryAdd"
      @close="showCategoryAdd = !showCategoryAdd"
    />
    <div v-if="categoriesToShow.length" class="categoriesList">
      <div class="categoriesList--header">
        <h2 v-if="title" class="categoriesList--header--title">
          {{ title }}
        </h2>
        <div class="categoriesList--header--tools">
          <button
            class="button noStyle"
            title="Add new category"
            @click="showCategoryAdd = !showCategoryAdd"
          >
            <i class="icon-plus" />
          </button>
        </div>
      </div>
      <LList v-if="categoriesToShow.length">
        <li v-for="category in categoriesToShow" :key="category._id">
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
    },
    limitCategories: {
      type: Number,
      required: false,
      default: 0
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
    }),
    categoriesToShow() {
      let categories = null;
      if (this.limitCategories) {
        categories = this.categories.slice(0, this.limitCategories);
      } else {
        categories = this.categories;
      }

      return categories;
    }
  }
};
</script>

<style lang="scss" scoped>
.categoriesList {
  > .categoriesList--header {
    display: flex;
    align-items: center;
    padding: 16px 0;
    justify-content: space-between;

    > .categoriesList--header--title {
      font-weight: 300;
      margin: 0;
    }

    > .categoriesList--header--tools {
      display: flex;
      margin-left: auto;
    }
  }
}
</style>
