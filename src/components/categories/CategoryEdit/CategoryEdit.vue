<template>
  <UniversalModal @close="$router.go(-1)">
    <template v-slot:title>
      Edit category
    </template>
    <template v-slot:body>
      <form @submit.prevent="onSubmit">
        <label for="newTitle">Current title: {{ category.title }}</label>
        <span v-if="error" style="color: red;">{{ error }}</span>
        <input
          v-model="newTitle"
          v-focus
          name="newTitle"
          type="text"
          placeholder="New title"
          required
        />
        <l-button type="submit" design="primary">
          <span class="label">Update</span>
          <i class="icon-ok"></i>
        </l-button>
      </form>
    </template>
  </UniversalModal>
</template>

<script>
export default {
  name: "CategoryEdit",
  data() {
    return {
      newTitle: null,
      error: null
    };
  },
  computed: {
    category() {
      return this.$store.getters.getCategoryById(this.$route.params.categoryId);
    }
  },
  methods: {
    onSubmit() {
      if (!this.newTitle || !this.newTitle.trim()) {
        return (this.error = "New title is required.");
      } else if (this.category.title === this.newTitle) {
        return this.$router.go(-1);
      }
      this.$store.dispatch("updateCategory", {
        id: this.category._id,
        newTitle: this.newTitle
      });
      this.newTitle = null;
      this.error = null;
      this.$router.go(-1);
    }
  }
};
</script>
