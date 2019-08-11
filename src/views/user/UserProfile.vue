<template>
  <div class="userprofile">
    <l-card>
      <template v-slot:header>
        <span class="label">Profile</span>
        <router-link :to="{ name: 'user.edit' }" title="Edit user profile.">
          <i class="icon-pencil"></i>
        </router-link>
      </template>
      <template v-slot:default>
        <p>
          Name:
          {{ userInfo.name }}<br />
          Email:
          {{ userInfo.email }}<br />
          Account created: {{ userInfo.createdAt | formatDate }}
        </p>
      </template>
    </l-card>
    <TodosList :limit-todos="5" show-badge title="Latest to-do's" />
    <router-link
      v-if="todos.length"
      :to="{ name: 'todos.list' }"
      class="button primary"
      title="Show all to-do's"
    >
      <span class="label">Show all</span>
      <i class="icon-list"></i>
    </router-link>

    <CategoriesList
      show-badge
      title="Latest categories"
      :limit-categories="5"
    />

    <router-link
      v-if="categories.length"
      :to="{ name: 'categories.list' }"
      class="button primary"
      title="Show all categories"
    >
      <span class="label">Show all</span>
      <i class="icon-folder-open"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserProfile",
  filters: {
    formatDate(value) {
      const date = new Date(value);

      const formatted = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      return formatted;
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      todos: "getTodos",
      belongToCategory: "belongToCategory",
      categories: "getCategories"
    })
  }
};
</script>

<style lang="scss" scoped>
.userprofile {
  > .button {
    margin: 0 auto;
  }
}
</style>
