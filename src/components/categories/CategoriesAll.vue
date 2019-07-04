<template>
  <div class="container">
    <div class="title">
      <h2>Categories</h2>
    </div>
    <AddNew type="category" @submit="addNewCategory">
      <button class="button success">Add category <i class="material-icons" title="Add a new category">add</i></button>
    </AddNew>
    <ul class="list" v-if="categories.length">
    <li :to="{ name: 'categories.single', params: { categoryId: category._id }}"
      v-for="category in categories"
      :key="category._id">
      <ToolBox>
          <template v-slot:toggle>
            <i class="material-icons">more_vert</i>
          </template>
          <template v-slot:tools>
              <router-link :to="{ name: 'categories.delete', params: { categoryId: category._id }}" class="link alert">Delete</router-link>
            </template>
        </ToolBox>
      <router-link :to="{ name: 'categories.single', params: { categoryId: category._id }}" class="title">{{ category.title }}</router-link>
      <div class="badge">{{ todoCount(category._id) }}</div>
    </li>
  </ul>
  <p v-else>No categories found</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddNew from '@/components/modal/AddNew'
import ToolBox from '@/components/toolbox/ToolBox'
export default {
  name: 'CategoriesAll',
  components: {
    AddNew,
    ToolBox
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories'
    })
  },
  methods: {
    todoCount (id) {
      return this.$store.getters.getTodosByCategoryId(id).length
    },

    addNewCategory (data) {
      this.$store.dispatch('createCategory', data.title)
    }
  }
}
</script>

<style lang="scss">
</style>
